import { handleActions } from 'redux-actions';
import { ActionsPayloadType } from './actions';
import { videosInitialState, VideosState, Video, SavedForLaterMap } from './state';
import * as Types from './types';
import { SearchVideosResponse, SearchItem } from '../../modules/YoutubeService';

export const videosReducer = handleActions<VideosState, ActionsPayloadType>(
  {
    [Types.SET_SEARCH_TEXT]: (state, action) => {
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
        player: {
          isPlaying: false,
          videoId: '',
        },
      };
    },
    [Types.SEARCH_VIDEOS_REQUEST_SUCCESS]: (state, { payload }) => {
      const searchResults = payload as SearchVideosResponse;
      return {
        ...state,
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
        player: {
          isPlaying: false,
          videoId: '',
        },
      };
    },
    [Types.ADD_VIDEO_FOR_LATER]: (state, action) => {
      const newVideo = action.payload as SearchItem;
      return {
        ...state,
        savedForLater: {
          ...state.savedForLater,
          [newVideo.id.videoId]: newVideo,
        },
      };
    },
    [Types.SHOW_PLAYER_IFRAME]: (state) => {
      return {
        ...state,
        player: {
          isPlaying: true,
          videoId: state.player.videoId,
        },
      };
    },
    [Types.HIDE_PLAYER_IFRAME]: (state) => {
      return {
        ...state,
        player: {
          isPlaying: false,
          videoId: state.player.videoId,
        },
      };
    },
    [Types.SET_PLAYER_VIDEO_ID]: (state, action) => {
      const videoId = action.payload as string;
      return {
        ...state,
        player: {
          ...state.player,
          videoId,
        },
      };
    },
    [Types.CLEAR_PLAYER_VIDEO_ID]: (state) => {
      return {
        ...state,
        player: {
          ...state.player,
          videoId: '',
        },
      };
    },
    [Types.RECOMMENDED_VIDEOS_REQUEST]: (state) => {
      return {
        ...state,
        search: {
          ...state.search,
          isSearching: true,
        },
        player: {
          isPlaying: false,
          videoId: '',
        },
      };
    },
    [Types.RECOMMENDED_VIDEOS_REQUEST_SUCCESS]: (state, action) => {
      const payload = action.payload as SearchVideosResponse;
      return {
        ...state,
        search: {
          ...state.search,
          isSearching: false,
          nextPageToken: payload.nextPageToken,
        },
        recommended: payload.items,
      };
    },
    [Types.RECOMMENDED_VIDEOS_REQUEST_FAILURE]: (state, action) => {
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
    [Types.SET_VIDEOS_FOR_LATER]: (state, action) => {
      const savedForLater = action.payload as SavedForLaterMap;
      return {
        ...state,
        savedForLater,
      };
    },
  },
  videosInitialState,
);