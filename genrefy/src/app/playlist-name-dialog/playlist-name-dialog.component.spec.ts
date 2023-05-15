import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistNameDialogComponent } from './playlist-name-dialog.component';

describe('PlaylistNameDialogComponent', () => {
  let component: PlaylistNameDialogComponent;
  let fixture: ComponentFixture<PlaylistNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistNameDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
