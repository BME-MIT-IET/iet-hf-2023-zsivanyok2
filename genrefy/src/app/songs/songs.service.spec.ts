import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SongsService } from './songs.service';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { fakeAsync, flushMicrotasks } from '@angular/core/testing';

describe('SongsService', () => {
  let service: SongsService;
  let httpTestingController: HttpTestingController;

  // Mock localStorage
  let localStorageSpy: any;

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SongsService,
        { provide: 'localStorage', useValue: localStorageSpy }
      ]
    });

    service = TestBed.inject(SongsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('#addTracksToPlaylist should make a POST request to add tracks to a playlist', () => {
    const mockAccessToken = 'testAccessToken';
    const mockPlaylistId = 'testPlaylistId';
    const mockTrackUris = ['spotify:track:testTrackId1', 'spotify:track:testTrackId2'];
    const mockResponse = { snapshot_id: 'testSnapshotId' };

    service.addTracksToPlaylist(mockAccessToken, mockPlaylistId, mockTrackUris).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpTestingController.expectOne(`https://api.spotify.com/v1/playlists/${mockPlaylistId}/tracks`);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Authorization')).toEqual('Bearer ' + mockAccessToken);
    request.flush(mockResponse);
  });

  it('#fetchLikedTracks should fetch all liked tracks', async () => {
    const mockAccessToken = 'testAccessToken';
    const mockTrackChunks = [
      { // First chunk of tracks
        items: [
          {
            track: {
              name: 'Test Song 1',
              artists: [{ name: 'Test Artist 1', id: 'testArtistId1' }],
              uri: 'spotify:track:testSongId1'
            }
          }
        ],
        next: 'https://api.spotify.com/v1/me/tracks?limit=1&offset=1' // Indicate that there are more tracks to fetch
      },
      { // Second chunk of tracks
        items: [
          {
            track: {
              name: 'Test Song 2',
              artists: [{ name: 'Test Artist 2', id: 'testArtistId2' }],
              uri: 'spotify:track:testSongId2'
            }
          }
        ],
        next: null // Indicate that there are no more tracks to fetch
      }
    ];
  
    // Start the fetchLikedTracks function, but don't wait for it to finish
    const songs = await service.fetchLikedTracks(mockAccessToken);
  
    // Expect and respond to the first HTTP request
    const request1 = httpTestingController.expectOne(`https://api.spotify.com/v1/me/tracks?limit=1&offset=0`);
    request1.flush(mockTrackChunks[0]);
  
    // Expect and respond to the second HTTP request
    const request2 = httpTestingController.expectOne(`https://api.spotify.com/v1/me/tracks?limit=1&offset=1`);
    request2.flush(mockTrackChunks[1]);
      
    // Check the results
    expect(localStorageSpy.setItem).toHaveBeenCalledWith('songs', JSON.stringify(songs));
    expect(songs).toEqual([
      { songName: 'Test Song 1', artistName: 'Test Artist 1', artistId: 'testArtistId1', uri: 'spotify:track:testSongId1' },
      { songName: 'Test Song 2', artistName: 'Test Artist 2', artistId: 'testArtistId2', uri: 'spotify:track:testSongId2' },
    ]);
  
    // After all assertions and expectations, verify there are no pending http calls
    httpTestingController.verify();
  });

  it('#createPlaylist should send POST request to create new playlist', () => {
    const mockAccessToken = 'testAccessToken';
    const mockPlaylistName = 'Test Playlist';
    const mockUserId = 'testUserId';
    const mockResponse = { message: 'Playlist created successfully' };
  
    // Mock user_id in local storage
    localStorage.setItem('user_id', mockUserId);
  
    service.createPlaylist(mockAccessToken, mockPlaylistName).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const url = `https://api.spotify.com/v1/users/${mockUserId}/playlists`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ name: mockPlaylistName });
    expect(req.request.headers.get('Authorization')).toEqual('Bearer ' + mockAccessToken);
    req.flush(mockResponse); // Respond with the mock response
  });
  
});
