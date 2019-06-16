import { Dispatch } from 'redux';
import * as Actions from './actions';
import YoutubeService from '../../modules/YoutubeService';
import { AppState } from '..';

export const thunkSearchVideos = (query: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  dispatch(Actions.searchVideosRequest());
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

export const thunkStartPlayer = (videoId: string) => async (dispatch: Dispatch) => {
  dispatch(Actions.setPlayerVideoId(videoId));
  dispatch(Actions.showPlayerIframe());
};

export const thunkStopPlayer = () => async (dispatch: Dispatch) => {
  dispatch(Actions.clearPlayerVideoId());
  dispatch(Actions.hidePlayerIframe());
};