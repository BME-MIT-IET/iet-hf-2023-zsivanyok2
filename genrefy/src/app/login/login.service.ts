import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  /**
   * Fetches the profile data of the current user from the Spotify API.
   *
   * @param token - The access token for the Spotify API.
   * @returns A promise that resolves to the profile data of the current user.
   */
  async fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
  }
  /**
   * Redirects the user to the Spotify Authorization Code Flow.
   *
   * This method generates a code verifier and a code challenge, stores the verifier in local storage,
   * and redirects the user to the Spotify Authorization page with necessary parameters.
   *
   * @param clientId - The Spotify client ID.
   */
  async redirectToAuthCodeFlow(clientId: string) {
    const verifier = this.generateCodeVerifier(128);
    const challenge = await this.generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:4200/login");
    params.append("scope", "user-library-read playlist-modify-public");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }
  /**
   * Generates a code verifier for the Spotify Authorization Code Flow.
   *
   * @param length - The length of the code verifier.
   * @returns A string representing the code verifier.
   */
  generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  /**
   * Generates a code challenge for the Spotify Authorization Code Flow.
   *
   * This method generates a SHA-256 digest of the code verifier, encodes it in Base64URL format,
   * and returns the result.
   *
   * @param codeVerifier - The code verifier.
   * @returns A promise that resolves to a string representing the code challenge.
   */
  async generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
  /**
   * Fetches the access token from the Spotify API.
   *
   * This method sends a POST request to the Spotify API with necessary parameters,
   * and returns the access token from the response.
   *
   * @param clientId - The Spotify client ID.
   * @param code - The code received from the Spotify Authorization Code Flow.
   * @returns A promise that resolves to a string representing the access token.
   */
  async getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:4200/login");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const { access_token } = await result.json();
    return access_token;
  }
}
