import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersService } from './filters.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  accessToken: string | null = null;
  likedTracks: any[] = [];
  @Input() topGenres: string[] = [];
  @Input() selectedGenres: Set<string> = new Set();
  @Input() filteredSongCount: number = 0;
  filteredSongs: any[] = [];

  constructor(private filtersService: FiltersService, private router: Router) {}

  async ngOnInit() {
    this.accessToken = localStorage.getItem('access_token');
    this.likedTracks = await this.filtersService.fetchLikedTracksWithGenres(this.accessToken!!);
    this.topGenres = this.filtersService.getTopGenres(this.likedTracks, 9);
    this.filteredSongs = this.filtersService.getFilteredSongs();
    if (this.filteredSongs.length === 0) {
      this.filteredSongCount = this.likedTracks.length;
    }
    else {
      this.filteredSongCount = this.filteredSongs.length;
      this.selectedGenres = this.filtersService.getSelectedGenres();
    }
  }


  /**
   * Toggles a genre in the selected genres set.
   * 
   * If the genre is already selected, it is removed from the set.
   * If it is not selected, it is added to the set.
   * After the genre set is updated, the songs are filtered based on the selected genres, and the count of filtered songs is updated.
   *
   * @param genre - The genre to toggle in the selected genres set.
 */
  onGenreToggle(genre: string) {
    if (this.selectedGenres.has(genre)) {
      console.log('Unselecting ' + genre) 
      this.selectedGenres.delete(genre);
    } else {
      console.log('Selecting ' + genre)
      this.selectedGenres.add(genre);
    }

    this.filteredSongs = this.filtersService.filterSongsByGenres(this.likedTracks, this.selectedGenres);
    this.filteredSongCount = this.filteredSongs.length;
  }

  /**
   * Updates the state of filters in the `FiltersService` and navigates to the `/songs` route.
   *
   * This function is typically used to apply the selected filters and display the resulting song list.
   * The current selected songs and genres are saved in the `FiltersService` for later use.
  */  
  onShowResult() {
    this.filtersService.setFilters(this.filteredSongs, this.selectedGenres);
    this.router.navigate(['/songs']);
  }

  /**
   * Clears all currently selected genres and resets the filtered songs to the full list of liked songs.
   *
   * This function is used to reset the state of the filter. It clears the set of selected genres,
   * and sets the filtered songs to be the same as the full list of liked songs, effectively removing any filters.
   * The count of filtered songs is also updated to reflect this change.
 */
  onClearFilters() {
    this.selectedGenres.clear();
    this.filteredSongs = this.likedTracks;
    this.filteredSongCount = this.likedTracks.length;
  }
}
