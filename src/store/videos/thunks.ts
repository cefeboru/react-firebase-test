import { Dispatch } from 'redux';
import * as Actions from './actions';
import YoutubeService, { SearchItem } from '../../modules/YoutubeService';
import { AppState } from '..';
import { FirebaseApp } from '../../modules/FirebaseApp';
import { SavedForLaterMap } from './state';
import { push } from 'connected-react-router';

export const thunkSearchVideos = (query: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  dispatch(Actions.searchVideosRequest());
  dispatch(push('/'));
  try {
    const accessToken = getState().system.accessToken;
    const searchResults = await new YoutubeService(accessToken).searchVideos(query);
    dispatch(Actions.searchVideosRequestSuccess(searchResults));
  } catch (error) {
    console.error(error);
    dispatch(Actions.searchVideosRequestFailure(error.message));
  }
};

export const thunkGetRecommendedVideos = () => async (dispatch: Dispatch, getState: () => AppState) => {
  dispatch(Actions.recommendedVideosRequest());
  try {
    const searchResults = await new YoutubeService(getState().system.accessToken).searchVideos('');
    dispatch(Actions.recommendedVideosRequestSuccess(searchResults));
  } catch (error) {
    console.error(error);
    dispatch(Actions.recommendedVideosRequestFailure(error.message));
  }
};

export const thunkClearSearch = () => async (dispatch: Dispatch, getState: () => AppState) => {
  dispatch(Actions.clearSearchResults());
  dispatch(Actions.clearSearchText());
  await thunkSearchVideos('')(dispatch, getState);
};

export const thunkAddVideoForLater = (video: SearchItem) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const firebaseDb = new FirebaseApp().getDb();
    const state = getState();
    const userId = state.system.user.uid;
    const videoId = video.id.videoId;
    const VideoDbPath = `users/${userId}/savedForLaterVideos/${videoId}`;
    await firebaseDb.ref(VideoDbPath).set(video);
    await dispatch(Actions.addVideoForLater(video));
  } catch (error) {
    console.error(error.message);
  }
};

export const thunkLoadSavedForLaterVideos = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const firebaseDB = new FirebaseApp().getDb();
  const state = getState();
  const userId = state.system.user.uid;
  const savedVideosDbPath = `users/${userId}/savedForLaterVideos/`;
  const dbSnapshot = await firebaseDB.ref(savedVideosDbPath).once('value');
  if (dbSnapshot.val()) {
    const savedForLaterVideos: SavedForLaterMap = dbSnapshot.val();
    dispatch(Actions.setVideosForLater(savedForLaterVideos));
  }
};