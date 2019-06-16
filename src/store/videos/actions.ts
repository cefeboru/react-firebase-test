import { createAction } from 'redux-actions';
import * as Types from './types';
import { Video } from './state';
import { SearchVideosResponse } from '../../modules/YoutubeService';

export const updateSearchText = createAction<string>(Types.UPDATE_SEARCH_TEXT);
export const clearSearchText = createAction(Types.CLEAR_SEARCH_TEXT);
export const clearSearchResults = createAction(Types.CLEAR_SEARCH_RESULTS);
export const addVideoForLater = createAction<Video>(Types.ADD_VIDEO_FOR_LATER);

export const searchVideosRequest = createAction(Types.SEARCH_VIDEOS_REQUEST);
export const searchVideosRequestSuccess = createAction<SearchVideosResponse>(Types.SEARCH_VIDEOS_REQUEST_SUCCESS);
export const searchVideosRequestFailure = createAction<string>(Types.SEARCH_VIDEOS_REQUEST_FAILURE);

export type ActionsPayloadType = string | SearchVideosResponse | Video | undefined;