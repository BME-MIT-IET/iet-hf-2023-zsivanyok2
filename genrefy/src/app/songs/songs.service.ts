// src/app/songs/songs.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, forkJoin } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  constructor(private http: HttpClient) { }
  /**
   * Fetches the current user's liked songs from the Spotify API.
   *
   * This method retrieves the liked songs in chunks of 50 and keeps fetching until all songs have been retrieved.
   * It then extracts and stores the necessary song data in local storage.
   *
   * @param accessToken - The access token for the Spotify API.
   * @returns A promise that resolves with an array of the user's liked songs.
   */
  async fetchLikedTracks(accessToken: string): Promise<any[]> {
    let offset = 0;
    const limit = 50;
    let songs: any[] = [];
    let hasNext = true;

    while (hasNext) {
      const chunk = await this.fetchLikedTracksChunk(accessToken, limit, offset);
      hasNext = chunk.next !== null;
      offset += limit;
      const extractedData = chunk.items.map((item: any) => {
        const songName = item.track.name;
        const artistName = item.track.artists[0].name;
        const artistId = item.track.artists[0].id;
        const uri = item.track.uri

        return { songName, artistName, artistId, uri };
      });
      songs = songs.concat(extractedData);
    }
    localStorage.setItem('songs', JSON.stringify(songs));
    return songs;
  }
  /**
   * Retrieves the user's liked songs from local storage.
   *
   * @returns An array of the user's liked songs.
   */
  getLikedTracksFromLocalStorage(): any[] {
    const songs = localStorage.getItem('songs');
    return songs ? JSON.parse(songs) : [];
  }
  /**
   * Fetches a chunk of the current user's liked songs from the Spotify API.
   *
   * This method retrieves a specified number of liked songs starting from a specified offset.
   *
   * @param accessToken - The access token for the Spotify API.
   * @param limit - The number of songs to retrieve.
   * @param offset - The starting point from which to retrieve songs.
   * @returns A promise that resolves with the retrieved chunk of liked songs.
   */
  private async fetchLikedTracksChunk(
    accessToken: string,
    limit: number,
    offset: number
  ): Promise<any> {
    const url = `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });


    return await response.json();
  }

  /**
   * Creates a new playlist for the current user on Spotify.
   *
   * This method makes a POST request to the Spotify API to create a new playlist with the specified name.
   *
   * @param accessToken - The access token for the Spotify API.
   * @param playlistName - The name of the new playlist.
   * @returns An Observable of the HTTP response.
   */
  createPlaylist(accessToken: string, playlistName: string): Observable<any> {
    const userId = localStorage.getItem('user_id');
    console.log(accessToken)
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const body = {
      name: playlistName
    };
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken
      })
    };

    return this.http.post(url, body, options);
  }
  /**
   * Adds tracks to a playlist on Spotify.
   *
   * This method makes a POST request to the Spotify API to add an array of track URIs to a playlist.
   * It splits the track URIs array into smaller chunks of 100 and sends the requests one by one with a delay.
   *
   * @param accessToken - The access token for the Spotify API.
   * @param playlistId - The ID of the playlist.
   * @param trackUris - The array of track URIs to be added to the playlist.
   * @returns An Observable of the HTTP response.
   */
  addTracksToPlaylist(accessToken: string, playlistId: string, trackUris: string[]): Observable<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken
      })
    };

    // Splitting the track URIs array into smaller chunks of 100
    const trackUrisChunks = [];
    while (trackUris.length > 0) {
      trackUrisChunks.push(trackUris.splice(0, 100));
    }

    // Create an observable from the chunks
    const trackUrisChunks$ = from(trackUrisChunks);

    // Use concatMap to execute the requests one by one with a delay
    return trackUrisChunks$.pipe(
      concatMap((trackUrisChunk) => {
        const body = { uris: trackUrisChunk };
        // delay operator here
        return this.http.post(url, body, options).pipe(delay(1000));
      })
    );
  }

}

