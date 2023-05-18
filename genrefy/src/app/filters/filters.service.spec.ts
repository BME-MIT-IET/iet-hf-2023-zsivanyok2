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

  // Additional tests...
});
