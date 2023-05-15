import { Injectable } from '@angular/core';
import { SongsService } from '../songs/songs.service';


@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(
    private songsService: SongsService
  ) { }

  /**
   * Fetches liked tracks with their corresponding genres for a given Spotify user.
   *
   * This function uses the Spotify API to fetch the liked tracks of a user with a given access token,
   * extracts the unique artist IDs from these tracks, and fetches the corresponding artist data.
   * If the artists data is not in the local storage, it fetches them using `fetchArtists`.
   * It then creates a map of artist IDs to their respective genres, and amends this genre data to the liked tracks.
   *
   * @param accessToken - The access token of the Spotify user.
   * @returns A Promise that resolves to an array of liked tracks, each with an added `genres` property containing the genres of the artist.
   *
   * @async
 */
  async fetchLikedTracksWithGenres(accessToken: string): Promise<any[]> {
    // Call the fetchLikedTracks, extractArtistIds, fetchArtists, amendGenresToTracks methods
    // and return the liked tracks with genres
    const likedTracks = this.songsService.getLikedTracksFromLocalStorage();
    // Extract unique artist IDs
    const uniqueArtistIds = [...new Set(likedTracks.map((track) => track.artistId))];
    // Fetch artist data
    var artistsData = this.getArtistsFromLocalStorage();
    if (artistsData.length === 0) {
      artistsData = await this.fetchArtists(accessToken, uniqueArtistIds);
    }
    // Create mapping of artist ID to genres
    const artistGenresMap: { [key: string]: string[] } = {};
    artistsData.forEach((artist) => {
      artistGenresMap[artist.id] = artist.genres;
    });

    // Amend genres to liked tracks
    likedTracks.forEach((track) => {
      track.genres = artistGenresMap[track.artistId];
    });

    return likedTracks;
  }

  /**
   * Retrieves the artist data from local storage.
   *
   * This function gets the 'artists' item from local storage, which is expected to be a JSON string,
   * and parses it back into a JavaScript array. If no 'artists' item is found in local storage,
   * the function returns an empty array.
   *
   * @returns An array of artist objects retrieved from local storage, or an empty array if no 'artists' item is found.
 */
  getArtistsFromLocalStorage(): any[] {
    const artists = localStorage.getItem('artists');
    return artists ? JSON.parse(artists) : [];
  }

  /**
   * Fetches data for a list of artists from the Spotify API.
   *
   * This function takes a list of artist IDs and an access token, and fetches the corresponding artist data from the Spotify API.
   * The data is fetched in chunks of 50 artists at a time, due to the API's limitations.
   * If any of the fetch operations fail, the function throws an error.
   * The fetched artist data is then stored in local storage as a JSON string under the 'artists' key.
   *
   * @param accessToken - The access token of the Spotify user.
   * @param artistIds - An array of artist IDs for which to fetch data.
   * @returns A Promise that resolves to an array of artist data objects.
   * @throws Will throw an error if any of the fetch operations fail.
   *
   * @async
 */
  async fetchArtists(accessToken: string, artistIds: string[]): Promise<any[]> {
    const chunkSize = 50;
    const artistsData: any[] = [];

    for (let i = 0; i < artistIds.length; i += chunkSize) {
      const idsChunk = artistIds.slice(i, i + chunkSize).join(',');
      const response = await fetch(`https://api.spotify.com/v1/artists?ids=${idsChunk}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch artist data: ${response.statusText}`);
      }

      const data = await response.json();
      artistsData.push(...data.artists);
    }

    localStorage.setItem('artists', JSON.stringify(artistsData));
    return artistsData;
  }
  /**
   * Fetches the top genres from either the local storage or from the liked tracks.
   *
   * The function first tries to retrieve the top genres from the local storage.
   * If the data is not found, the function creates a map of genre counts from the liked tracks,
   * sorts the genres by the count, stores the top N genres in the local storage, and returns them.
   *
   * @param likedTracks - An array of tracks liked by the user.
   * @param topN - The number of top genres to return.
   * @returns An array of top N genres.
   */
  getTopGenres(likedTracks: any[], topN: number) {
    const topGenres = localStorage.getItem('topGenres');
    if (topGenres) {
      console.log('Getting top genres from local storage')
      console.log(topGenres)
      return JSON.parse(topGenres);
    }
    else {
      console.log('Getting top genres from liked tracks')
      // Create a map of genres to counts
      const genresMap: { [key: string]: number } = {};
      likedTracks.forEach((track) => {
        track.genres.forEach((genre: string) => {
          genresMap[genre] = genresMap[genre] ? genresMap[genre] + 1 : 1;
        });
      });

      // Sort genres by count
      const genres = Object.keys(genresMap);
      genres.sort((a, b) => genresMap[b] - genresMap[a]);

      localStorage.setItem('topGenres', JSON.stringify(genres.slice(0, topN)));

      // Return top N genres
      return genres.slice(0, topN);
    }
  }
  /**
   * Filters the liked tracks by the selected genres.
   *
   * The function returns only those liked tracks that have all the selected genres.
   *
   * @param likedTracks - An array of tracks liked by the user.
   * @param genres - A set of selected genres.
   * @returns An array of tracks that have all the selected genres.
   */
  filterSongsByGenres(likedTracks: any[], genres: Set<string>) {
    return likedTracks.filter((track) => {
      const trackGenres = new Set(track.genres);
      return [...genres].every((genre) => trackGenres.has(genre));
    });
  }

  /**
   * Stores the filtered songs and selected genres in the local storage.
   *
   * @param filteredSongs - An array of songs that passed the filter.
   * @param genres - A set of selected genres.
   */
  setFilters(filteredSongs: any[], genres: Set<string>) {
    localStorage.setItem('filteredSongs', JSON.stringify(filteredSongs));
    localStorage.setItem('selectedGenres', JSON.stringify([...genres]));
  }
  /**
   * Retrieves the filtered songs from the local storage.
   *
   * @returns An array of filtered songs, or an empty array if the data is not found in the local storage.
   */
  getFilteredSongs(): any[] {
    const filteredSongs = localStorage.getItem('filteredSongs');
    return filteredSongs ? JSON.parse(filteredSongs) : [];
  }
  /**
   * Retrieves the selected genres from the local storage.
   *
   * @returns A set of selected genres, or an empty set if the data is not found in the local storage.
   */
  getSelectedGenres(): Set<string> {
    const genres = localStorage.getItem('selectedGenres');
    return genres ? new Set(JSON.parse(genres)) : new Set();
  }

}
