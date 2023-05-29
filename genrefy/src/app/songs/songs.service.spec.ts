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
