import { Component } from '@angular/core';

@Component({
  selector: 'app-playlist-name-dialog',
  templateUrl: './playlist-name-dialog.component.html',
  styleUrls: ['./playlist-name-dialog.component.css'],
})
export class PlaylistNameDialogComponent {
  playlistName: string = 'Playlist Name';
}
