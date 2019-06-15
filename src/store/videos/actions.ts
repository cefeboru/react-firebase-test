import { createAction } from 'redux-actions';
import { UPDATE_SEARCH_TEXT, CLEAR_SEARCH_TEXT, CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_RESULTS, ADD_VIDEO_FOR_LATER } from './types';
import { Video } from './state';

export const updateSearchText = createAction<string>(UPDATE_SEARCH_TEXT);
export const clearSearchText = createAction(CLEAR_SEARCH_TEXT);
export const clearSearchResults = createAction(CLEAR_SEARCH_RESULTS);
export const updateSearchResults = createAction<any[]>(UPDATE_SEARCH_RESULTS);
export const addVideoForLater = createAction<Video>(ADD_VIDEO_FOR_LATER);

export type ActionsPayloadType = string | any[] | Video | undefined;