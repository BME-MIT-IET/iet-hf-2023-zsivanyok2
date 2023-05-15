# Genrefy - Gain control over your Spotify playlists

This project is a Spotify application that helps users create playlists based on their favourite genres. The application fetches a user's liked songs and creates a playlist by filtering the songs according to their preferred genres.


## Features

- Fetches user's liked songs from Spotify
- Find out what your favourite genres are

- Allows users to select their preferred genres
- Creates a new Spotify playlist based on the selected genres

## Requirements

- [Node.js and npm](https://nodejs.org/en/download/)
- [Angular CLI](https://angular.io/cli)
- [Spotify developer account](https://developer.spotify.com/)

## Setup and Installation

To set up the project on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/levente-murgas/genrefy.git
```

2. Navigate to the project directory:

```bash
cd genrefy
```
3. Install the project dependencies:

```bash
npm install
```
4. Start the application:

```bash
ng serve
```

This will start the application on a local development server. You can access it by going to http://localhost:4200 in your web browser.

## Usage

After the application is running, you'll need to log in with your Spotify account. The application will then fetch your liked songs and use Spotify's API to get the genres of the songs' artists. It will then display your top genres based on these songs.

You can filter your liked songs by genre, and the application will create a Spotify playlist with the name you specify containing these songs.

## Screenshots

![alt text](https://github.com/levente-murgas/genrefy/blob/main/screenshots/songs.png)

![alt text](https://github.com/levente-murgas/genrefy/blob/main/screenshots/filters.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


