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
  // Other tests go here...
});
