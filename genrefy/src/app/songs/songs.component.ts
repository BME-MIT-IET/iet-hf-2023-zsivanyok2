import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from './songs.service';
import { FiltersService } from '../filters/filters.service';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistNameDialogComponent } from '../playlist-name-dialog/playlist-name-dialog.component';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent implements OnInit {
  accessToken: string | null = null;
  numberOfSongs: number = 0;
  songs: any[] = [];
  isLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private songsService: SongsService,
    private filtersService: FiltersService
  ) { }
  /**
   * An Angular lifecycle method called when the component is initialized.
   *
   * This method retrieves the access token from local storage and the liked tracks
   * either from the FiltersService or from the SongsService.
   * If there are no liked tracks in local storage and an access token is available,
   * it fetches the liked tracks from the Spotify API.
   * Finally, it sets the number of songs and the loading state of the component.
   */
  async ngOnInit() {
    console.log('SongsComponent.ngOnInit() called');
    this.songs = this.filtersService.getFilteredSongs();
    if (this.songs.length === 0) {
      this.accessToken = localStorage.getItem('access_token');
      // Remove the code from the URL
      const queryParams = this.route.snapshot.queryParams;
      if (queryParams && queryParams['code']) {
        this.router.navigate([], { queryParams: { code: null }, queryParamsHandling: 'merge' });
      }
      this.songs = this.songsService.getLikedTracksFromLocalStorage();
      if (this.songs.length === 0) {
        if (this.accessToken) {
          this.isLoading = true;
          this.songs = await this.songsService.fetchLikedTracks(this.accessToken);
          console.log(this.songs)
          this.numberOfSongs = this.songs.length;
          this.isLoading = false;
        } else {
          console.log('No access token found');
        }
      } else {
        this.numberOfSongs = this.songs.length;
        this.isLoading = false;
      }
    } else {
      this.numberOfSongs = this.songs.length;
      this.isLoading = false;
    }
  }
  /**
   * Saves the liked tracks to a new Spotify playlist with a given name.
   *
   * This method retrieves the access token from local storage, creates a new Spotify playlist
   * with the provided name, and adds the liked tracks to the new playlist.
   *
   * @param playlistName - The name of the new playlist.
   */
  savePlaylist(playlistName: string): void {
    this.accessToken = localStorage.getItem('access_token');
    console.log(this.songs)
    this.songsService.createPlaylist(this.accessToken!!, playlistName).subscribe(response => {
      const playlistId = response.id;
      const trackUris = this.songs.map(song => song.uri);
      console.log('Playlist created')
      this.songsService.addTracksToPlaylist(this.accessToken!!, playlistId, trackUris).subscribe(() => {
        console.log('Tracks added');
      });
    });
  }
  /**
 * Opens a dialog for the user to enter the name of the new playlist.
 *
 * This method opens a MatDialog with the PlaylistNameDialogComponent.
 * When the dialog is closed, if a result is available, it saves the liked tracks to a new playlist with the entered name.
 */
  openPlaylistNameDialog(): void {
    const dialogRef = this.dialog.open(PlaylistNameDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.savePlaylist(result);
      }
    });
  }

  /**
   * Navigates to the filters page.
   *
   * This method uses the Angular Router to navigate to the '/filters' route.
   */
  navigateToFilters(): void {
    this.router.navigate(['/filters']); // Navigate to filters page
  }

}
