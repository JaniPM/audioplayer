# audioplayer

## backend

Contains the api of the audioplayer. Uses MongoDB as database and local folder `./assets/` to store and serve audio files.


### Getting started

Starts in development environment with `npm start` and be accessed from `localhost:3000`

Run unit tests `npm test`

Run integration tests `npm run test-integration`. Note requires MongoDB runnning in the default port 27017

Currently support routes:

`/songs/` with pagination e.g. `/songs?skip=3&limit=5`

`/songs/:id`

`/songs/:id/download` to download audio file

`/songs/:id/stream` to stream the audio

Api doesn't have versioning of the routes at the moment. Also audio file that is served is currently `./assets/sample.mp3`. See `./test/integration` how to seed some sample data.
