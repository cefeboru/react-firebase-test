import * as Types from './types';
import * as Actions from './actions';
import { VideosState, videosInitialState, Video } from './state';
import { videosReducer } from './reducer';
import { SearchVideosResponse } from '../../modules/YoutubeService';

const searchText = 'some search string';
const newSearchResults: SearchVideosResponse = {
  items: ['1', '2', '3'],
  nextPageToken: 'fakeToken',
};

describe('Videos Reducer', () => {
  let state: VideosState;

  beforeEach(() => {
    state = videosInitialState;
  });

  describe(Types.UPDATE_SEARCH_TEXT, () => {
    const action = Actions.updateSearchText(searchText);
    it('Should update the search text correctly', () => {
      state = videosReducer(state, action);
      expect(state).toHaveProperty('search.text', searchText);
    });
  });

  describe(Types.CLEAR_SEARCH_TEXT, () => {
    const action = Actions.clearSearchText();
    it('Should clear the seach text', () => {
      state.search.text = searchText;
      state = videosReducer(state, action);
      expect(state).toHaveProperty('search.text', '');
    });
  });

  describe(Types.CLEAR_SEARCH_RESULTS, () => {
    const action = Actions.clearSearchResults();
    it('Should clear the search results', () => {
      const { items, nextPageToken } = newSearchResults;
      state.search.results = items;
      state.search.nextPageToken = nextPageToken;
      state = videosReducer(state, action);
      expect(state).toHaveProperty('search.results', []);
    });
  });

  describe(Types.ADD_VIDEO_FOR_LATER, () => {
    const newVideo: Video = { description: '',  thumbnailUrl: 'fakeURL', title: 'fakeTitle', videoId: 'someId' };
    const action = Actions.addVideoForLater(newVideo);
    it('Should add a new video', () => {
      state = videosReducer(state, action);
      expect(state.savedForLater).toContain(newVideo);
    });
  });

  describe(Types.SEARCH_VIDEOS_REQUEST, () => {
    const action = Actions.searchVideosRequest();
    it('Should indicate that a search is happenning', () => {
      state = videosReducer(state, action);
      expect(state).toHaveProperty('search.isSearching', true);
    });
  });

  describe(Types.SEARCH_VIDEOS_REQUEST_FAILURE, () => {
    const fakeErorr = 'fakeError';
    const action = Actions.searchVideosRequestFailure(fakeErorr);
    beforeEach(() => {
      state.search.isSearching = true;
      state.search.error = '';
      state = videosReducer(state, action);
    });

    it('Should clean the search results', () => {
      expect(state).toHaveProperty('search.results', []);
    });

    it('Should clean the next page token', () => {
      expect(state.search.nextPageToken).toBe('');
    });

    it('Should indicate the application that the request finished', () => {
      expect(state).toHaveProperty('search.isSearching', false);
    });

    it('Should set the error message', () => {
      expect(state).toHaveProperty('search.error', fakeErorr);
    });
  });

  describe(Types.SEARCH_VIDEOS_REQUEST_SUCCESS, () => {
    const action = Actions.searchVideosRequestSuccess(newSearchResults);
    beforeEach(() => {
      state.search = {
        error: '',
        isSearching: true,
        nextPageToken: '',
        results: [],
        text: 'someText',
      };
      state = videosReducer(state, action);
    });
    it('Should replace the search results by the new ones', () => {
      expect(state).toHaveProperty('search.results', newSearchResults.items);
    });

    it('Should set the next page token', () => {
      expect(state).toHaveProperty('search.nextPageToken', newSearchResults.nextPageToken);
    });

    it('Should indicate the application that the request finished', () => {
      expect(state).toHaveProperty('search.isSearching', false);
    });
  });
});