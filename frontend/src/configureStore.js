import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './state/reducer';
import rootSagas from './state/sagas';

// Define here the reducers that will always be present in the application
const staticReducers = {
  root: rootReducer
};

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
}

// Configure the store
export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createReducer(),
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      devToolsEnhancer(),
    )
  );

  Object.keys(rootSagas).forEach(key => sagaMiddleware.run(rootSagas[key]));

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    console.log('inject reducer');
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  // Return the modified store
  return store;
}
