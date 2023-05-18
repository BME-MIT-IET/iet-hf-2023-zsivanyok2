import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FiltersComponent } from './filters.component';
import { FiltersService } from './filters.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  let mockFiltersService = jasmine.createSpyObj('FiltersService', ['fetchLikedTracksWithGenres', 'getTopGenres', 'getFilteredSongs', 'getSelectedGenres', 'filterSongsByGenres', 'setFilters']);
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  let localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
         MatCardModule,
         MatChipsModule],
      declarations: [ FiltersComponent ],
      providers: [
        { provide: FiltersService, useValue: mockFiltersService },
        { provide: 'localStorage', useValue: localStorageSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;

    mockFiltersService.fetchLikedTracksWithGenres.and.returnValue(Promise.resolve([]));
    mockFiltersService.getTopGenres.and.returnValue([]);
    mockFiltersService.getFilteredSongs.and.returnValue([]);
    mockFiltersService.getSelectedGenres.and.returnValue(new Set<string>());
    mockFiltersService.filterSongsByGenres.and.returnValue([]);

    localStorageSpy.getItem.and.returnValue(null);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Additional tests...
});
