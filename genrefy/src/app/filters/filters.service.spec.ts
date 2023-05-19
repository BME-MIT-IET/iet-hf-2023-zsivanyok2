import { TestBed } from '@angular/core/testing';
import { FiltersService } from './filters.service';
import { SongsService } from '../songs/songs.service';
import { of } from 'rxjs';

describe('FiltersService', () => {
  let service: FiltersService;
  let mockSongsService = jasmine.createSpyObj('SongsService', ['getLikedTracksFromLocalStorage']);
  let fetchSpy: any;
  let mockResponse: any;
  let localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SongsService, useValue: mockSongsService },
        { provide: 'localStorage', useValue: localStorageSpy },
        FiltersService
      ]
    });
    service = TestBed.inject(FiltersService);
    mockSongsService.getLikedTracksFromLocalStorage.and.returnValue([]);
    localStorageSpy.getItem.and.returnValue(null);

    mockResponse = {
      ok: true,
      json: () => Promise.resolve({ artists: [{ id: '1', name: 'Artist 1' }, { id: '2', name: 'Artist 2' }]})
    };
    fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  
  it('#fetchLikedTracksWithGenres should return liked tracks with genres', async () => {
    const mockAccessToken = 'testAccessToken';
    const mockLikedTracks = [
      { songName: 'Test Song 1', artistName: 'Test Artist 1', artistId: 'testArtistId1', uri: 'spotify:track:testSongId1' },
      { songName: 'Test Song 2', artistName: 'Test Artist 2', artistId: 'testArtistId2', uri: 'spotify:track:testSongId2' },
    ];
    const mockArtistsData = [
      { id: 'testArtistId1', genres: ['pop', 'rock'] },
      { id: 'testArtistId2', genres: ['jazz', 'blues'] },
    ];

    mockSongsService.getLikedTracksFromLocalStorage.and.returnValue(mockLikedTracks); // Set the return value here instead
    spyOn(service, 'getArtistsFromLocalStorage').and.returnValue([]);
    spyOn(service, 'fetchArtists').and.returnValue(Promise.resolve(mockArtistsData));

    const result = await service.fetchLikedTracksWithGenres(mockAccessToken);

    expect(result[0].genres).toEqual(['pop', 'rock']);
    expect(result[1].genres).toEqual(['jazz', 'blues']);
  });

  it('#fetchArtists should fetch artists from Spotify API', async () => {
    const mockAccessToken = 'testAccessToken';
    const mockArtistIds = ['1', '2'];

    const artists = await service.fetchArtists(mockAccessToken, mockArtistIds);

    expect(fetchSpy).toHaveBeenCalledWith(`https://api.spotify.com/v1/artists?ids=${mockArtistIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${mockAccessToken}`,
      },
    });
    expect(artists.length).toEqual(2);
    expect(artists[0].id).toEqual('1');
    expect(artists[1].id).toEqual('2');
  });

  it('#fetchArtists should throw an error if the fetch operation fails', async () => {
    const mockAccessToken = 'testAccessToken';
    const mockArtistIds = ['1', '2'];
    
    // Mock the fetch function to reject with an error
    fetchSpy.and.returnValue(Promise.resolve({ ok: false, statusText: 'Not Found' }));

    try {
      await service.fetchArtists(mockAccessToken, mockArtistIds);
      fail('fetchArtists should have thrown an error');
    } catch (error) {
      expect(error).toEqual(new Error(`Failed to fetch artist data: Not Found`));
    }

    expect(fetchSpy).toHaveBeenCalledWith(`https://api.spotify.com/v1/artists?ids=${mockArtistIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${mockAccessToken}`,
      },
    });
  });
    


  it('#getTopGenres should return top genres from local storage', () => {
    localStorage.setItem('topGenres', JSON.stringify(['pop', 'rock', 'jazz']));
    const likedTracks: any = []; // Empty liked tracks. We are testing retrieval from local storage.

    const topGenres = service.getTopGenres(likedTracks, 3);

    expect(topGenres).toEqual(['pop', 'rock', 'jazz']);
  });

});

    

