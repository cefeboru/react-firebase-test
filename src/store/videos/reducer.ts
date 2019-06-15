import { handleActions } from 'redux-actions';
import { ActionsPayloadType } from './actions';
import { videosInitialState, VideosState, Video } from './state';
import { UPDATE_SEARCH_TEXT, CLEAR_SEARCH_TEXT, UPDATE_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS, ADD_VIDEO_FOR_LATER } from './types';

export const videosReducer = handleActions<VideosState, ActionsPayloadType>(
  {
    [UPDATE_SEARCH_TEXT]: (state, action) => {
      const newText = action.payload as string;
      return {
        ...state,
        searchText: newText,
      };
    },
    [CLEAR_SEARCH_TEXT]: (state) => {
      return {
        ...state,
        searchText: '',
      };
    },
    [UPDATE_SEARCH_RESULTS]: (state, action) => {
      const searchResults = action.payload as any[];
      return {
        ...state,
        searchResults,
      };
    },
    [CLEAR_SEARCH_RESULTS]: (state) => {
      return {
        ...state,
        searchResults: [],
      };
    },
    [ADD_VIDEO_FOR_LATER]: (state, action) => {
      const newVideo = action.payload as Video;
      return {
        ...state,
        savedForLater: [...state.savedForLater, newVideo],
      };
    },
  },
  videosInitialState,
);