import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { systemRecuder } from './system/reducer';
import { videosReducer } from './videos/reducer';
import reduxThunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

export const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  system: systemRecuder,
  videos: videosReducer,
});

export default function configureStore() {
  const middlewares = [
    reduxThunk,
    routerMiddleware(browserHistory),
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(
    createRootReducer(browserHistory),
    composeWithDevTools(middlewareEnhancer),
  );
  return store;
}

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;