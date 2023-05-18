import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { PlaylistNameDialogComponent } from './playlist-name-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  

describe('PlaylistNameDialogComponent', () => {
  let component: PlaylistNameDialogComponent;
  let fixture: ComponentFixture<PlaylistNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule],  
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
