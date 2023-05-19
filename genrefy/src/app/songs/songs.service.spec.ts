import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SongsService } from './songs.service';

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

  it('should be created', () => {
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
});
