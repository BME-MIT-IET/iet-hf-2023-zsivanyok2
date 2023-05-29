import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongsComponent } from './songs.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SongsService } from './songs.service';
import { FiltersService } from '../filters/filters.service';
import { MatCardModule } from '@angular/material/card'; // import MatCardModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('SongsComponent', () => {
  let component: SongsComponent;
  let fixture: ComponentFixture<SongsComponent>;
  let songsService: jasmine.SpyObj<SongsService>; // add this line

  beforeEach(async () => {
    const mockSongsService = jasmine.createSpyObj('SongsService', ['getLikedTracksFromLocalStorage', 'fetchLikedTracks', 'createPlaylist', 'addTracksToPlaylist']);
    mockSongsService.getLikedTracksFromLocalStorage.and.returnValue([]);
    songsService = mockSongsService; // add this line
    const mockFiltersService = jasmine.createSpyObj('FiltersService', ['getFilteredSongs']);
    mockFiltersService.getFilteredSongs.and.returnValue([]);
    const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    const mockActivatedRoute = {
      snapshot: {
        queryParams: {
          code: null
        }
      }
    };
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
 
    await TestBed.configureTestingModule({
      declarations: [ SongsComponent ],
      imports: [ MatCardModule, MatProgressSpinnerModule], // add MatCardModule to imports
      providers: [
        { provide: SongsService, useValue: mockSongsService },
        { provide: FiltersService, useValue: mockFiltersService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#savePlaylist should call SongsService to create playlist and add tracks', () => {
    const mockAccessToken = 'testAccessToken';
    spyOn(localStorage, 'getItem').and.returnValue(mockAccessToken);
    const mockPlaylistName = 'Test Playlist';
    const mockPlaylistId = 'testPlaylistId';
    const mockSongUri = 'spotify:track:testSongId';
    component.songs = [{ uri: mockSongUri }];

    songsService.createPlaylist.and.returnValue(of({ id: mockPlaylistId }));
    songsService.addTracksToPlaylist.and.returnValue(of({}));

    component.savePlaylist(mockPlaylistName);

    expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    expect(songsService.createPlaylist).toHaveBeenCalledWith(mockAccessToken, mockPlaylistName);
    expect(songsService.addTracksToPlaylist).toHaveBeenCalledWith(mockAccessToken, mockPlaylistId, [mockSongUri]);
  });

  
});

