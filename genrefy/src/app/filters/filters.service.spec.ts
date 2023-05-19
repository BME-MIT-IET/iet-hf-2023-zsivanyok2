import { TestBed } from '@angular/core/testing';
import { FiltersService } from './filters.service';
import { SongsService } from '../songs/songs.service';
import { of } from 'rxjs';

describe('FiltersService', () => {
  let service: FiltersService;
  let mockSongsService = jasmine.createSpyObj('SongsService', ['getLikedTracksFromLocalStorage']);

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

  // Additional tests...
});
