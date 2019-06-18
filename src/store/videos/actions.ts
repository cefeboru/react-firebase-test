import { createAction } from 'redux-actions';
import * as Types from './types';
import { SavedForLaterMap } from './state';
import { SearchVideosResponse, SearchItem } from '../../modules/YoutubeService';

export const updateSearchText = createAction<string>(Types.SET_SEARCH_TEXT);
export const clearSearchText = createAction(Types.CLEAR_SEARCH_TEXT);
export const clearSearchResults = createAction(Types.CLEAR_SEARCH_RESULTS);

export const setVideosForLater = createAction<SavedForLaterMap>(Types.SET_VIDEOS_FOR_LATER);
export const addVideoForLater = createAction<SearchItem>(Types.ADD_VIDEO_FOR_LATER);

export const setPlayerVideoId = createAction<string>(Types.SET_PLAYER_VIDEO_ID);
export const clearPlayerVideoId = createAction(Types.CLEAR_PLAYER_VIDEO_ID);
export const showPlayerIframe = createAction(Types.SHOW_PLAYER_IFRAME);
export const hidePlayerIframe = createAction(Types.HIDE_PLAYER_IFRAME);

export const searchVideosRequest = createAction(Types.SEARCH_VIDEOS_REQUEST);
export const searchVideosRequestSuccess = createAction<SearchVideosResponse>(Types.SEARCH_VIDEOS_REQUEST_SUCCESS);
export const searchVideosRequestFailure = createAction<string>(Types.SEARCH_VIDEOS_REQUEST_FAILURE);

export const recommendedVideosRequest = createAction(Types.RECOMMENDED_VIDEOS_REQUEST);
export const recommendedVideosRequestSuccess = createAction<SearchVideosResponse>(Types.RECOMMENDED_VIDEOS_REQUEST_SUCCESS);
export const recommendedVideosRequestFailure = createAction<string>(Types.RECOMMENDED_VIDEOS_REQUEST_FAILURE);

export type ActionsPayloadType = string |
  SearchVideosResponse |
  SearchItem |
  undefined |
  SavedForLaterMap;