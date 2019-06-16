import { handleActions } from 'redux-actions';
import { ActionsPayloadType } from './actions';
import { videosInitialState, VideosState, Video } from './state';
import * as Types from './types';
import { SearchVideosResponse } from '../../modules/YoutubeService';

export const videosReducer = handleActions<VideosState, ActionsPayloadType>(
  {
    [Types.UPDATE_SEARCH_TEXT]: (state, action) => {
      const newText = action.payload as string;
      return {
        ...state,
        search: {
          ...state.search,
          text: newText,
        },
      };
    },
    [Types.CLEAR_SEARCH_TEXT]: (state) => {
      return {
        ...state,
        search: {
          ...state.search,
          text: '',
        },
      };
    },
    [Types.SEARCH_VIDEOS_REQUEST]: (state) => {
      return {
        ...state,
        search: {
          ...state.search,
          isSearching: true,
        },
      };
    },
    [Types.SEARCH_VIDEOS_REQUEST_SUCCESS]: (state, { payload }) => {
      const searchResults = payload as SearchVideosResponse;
      return {
        ...state,
        searchResults,
        search: {
          ...state.search,
          isSearching: false,
          results: searchResults.items,
          nextPageToken: searchResults.nextPageToken,
        },
      };
    },
    [Types.SEARCH_VIDEOS_REQUEST_FAILURE]: (state, action) => {
      const error = action.payload as string;
      return {
        ...state,
        search: {
          ...state.search,
          error,
          isSearching: false,
          results: [],
          nextPageToken: '',
        },
      };
    },
    [Types.CLEAR_SEARCH_RESULTS]: (state) => {
      return {
        ...state,
        search: {
          ...state.search,
          results: [],
        },
      };
    },
    [Types.ADD_VIDEO_FOR_LATER]: (state, action) => {
      const newVideo = action.payload as Video;
      return {
        ...state,
        savedForLater: [...state.savedForLater, newVideo],
      };
    },
  },
  videosInitialState,
);