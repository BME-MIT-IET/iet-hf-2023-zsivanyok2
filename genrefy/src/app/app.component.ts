import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'genrefy';

  /**
 * Executes upon the initialization of the component.
 *
 * This method clears specific items from local storage upon component initialization.
 */
  ngOnInit() {
    localStorage.removeItem('artits');
    localStorage.removeItem('topGenres');
    localStorage.removeItem('filteredSongs');
    localStorage.removeItem('selectedGenres');
    localStorage.removeItem('songs');
  }
}
