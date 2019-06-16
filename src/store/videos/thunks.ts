import { Dispatch } from 'redux';
import youtubeService from '../../modules/YoutubeService';
import * as Actions from './actions';

export const thunkSearchVideos = (query: string) => async (dispatch: Dispatch) => {
  dispatch(Actions.searchVideosRequest());
  try {
    const searchResults = await youtubeService.searchVideos(query);
    dispatch(Actions.searchVideosRequestSuccess(searchResults));
  } catch (error) {
    console.error(error);
    dispatch(Actions.searchVideosRequestFailure(error.message));
  }
};

export const thunkClearSearch = () => async (dispatch: Dispatch) => {
  dispatch(Actions.clearSearchResults());
  dispatch(Actions.clearSearchText());
};

export const thunkStartPlayer = (videoId: string) => async (dispatch: Dispatch) => {
  dispatch(Actions.setPlayerVideoId(videoId));
  dispatch(Actions.showPlayerIframe());
};

export const thunkStopPlayer = () => async (dispatch: Dispatch) => {
  dispatch(Actions.clearPlayerVideoId());
  dispatch(Actions.hidePlayerIframe());
};