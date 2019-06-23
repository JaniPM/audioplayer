# audioplayer

## backend

Contains the api of the audioplayer. Uses MongoDB as database and local folder `./assets/` to store and serve audio files.


### Getting started

Starts in development environment with `npm start` and can be accessed from `localhost:3000`

Run unit tests `npm test`

Run integration tests `npm run test-integration`. Note! Requires MongoDB runnning in the default port 27017

Create some seed data `npm run seed`. Note! Requires MongoDB runnning in the default port 27017

Currently support routes:

`/songs/` with pagination e.g. `/songs?skip=3&limit=5`

`/songs/:id`

`/songs/:id/download` to download audio file

`/songs/:id/stream` to stream the audio

### Future Improvements

Api doesn't have versioning of the routes at the moment.

Audio file that is served is currently `./assets/sample.mp3`. See `./scripts/seed.js` how to seed some sample data.

Stream currently doens't support moving forward/backward stream. It alwasy plays from the beginning to the end.

## frontend

Contains the web UI of the audioplayer. Uses redux for state management and redux-sagas for side effects.

### Getting started

Starts in development environment with `npm start` and can be accessed from `localhost:3001`

Run unit tests `npm test`

### Structure

* **state** root level project state
* **components** contains all reusable presentation components
* **pages/songs** contains module to show songs library
  * state: all redux state related functions for song module's state.
  * components: presentation components specific to this module.

### Improvements

Ideally the each module (e.g. root level pages) would lazy load it's own sagas and reducers only when user navigates to page. For reducer the lazy loading is done (see `hooks`) but sagas are loaded in the `configureStore.js`.