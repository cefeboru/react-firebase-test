import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { systemRecuder } from './system/reducer';
import { videosReducer } from './videos/reducer';

const rootReducer = combineReducers({
  system: systemRecuder,
  videos: videosReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [reduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

  return store;
}