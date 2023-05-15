import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SongsModule } from './songs/songs.module';
import { FiltersComponent } from './filters/filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaylistNameDialogComponent } from './playlist-name-dialog/playlist-name-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FiltersComponent,
    PlaylistNameDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SongsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

