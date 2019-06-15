import { UPDATE_SEARCH_TEXT, CLEAR_SEARCH_TEXT, UPDATE_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS, ADD_VIDEO_FOR_LATER } from './types';
import { updateSearchText, clearSearchText, updateSearchResults, clearSearchResults, addVideoForLater } from './actions';
import { VideosState, videosInitialState, Video } from './state';
import { videosReducer } from './reducer';

const searchText = 'some search string';
const newSearchResults = [
  'result 1',
  'result 2',
];

describe('Videos Reducer', () => {
  let state: VideosState;

  beforeEach(() => {
    state = videosInitialState;
  });

  describe(UPDATE_SEARCH_TEXT, () => {
    const action = updateSearchText(searchText);
    it('Should update the search text correctly', () => {
      state = videosReducer(state, action);
      expect(state).toHaveProperty('searchText', searchText);
    });
  });

  describe(CLEAR_SEARCH_TEXT, () => {
    const action = clearSearchText();
    it('Should clear the seach text', () => {
      state = { ...state, searchText };
      state = videosReducer(state, action);
      expect(state).toHaveProperty('searchText', '');
    });
  });

  describe(UPDATE_SEARCH_RESULTS, () => {
    const action = updateSearchResults(newSearchResults);
    it('Should replace the search results by the new ones', () => {
      state = videosReducer(state, action);
      expect(state).toHaveProperty('searchResults', newSearchResults);
    });
  });

  describe(CLEAR_SEARCH_RESULTS, () => {
    const action = clearSearchResults();
    it('Should clear the search results', () => {
      state = { ...state, searchResults: newSearchResults };
      state = videosReducer(state, action);
      expect(state).toHaveProperty('searchResults', []);
    });
  });

  describe(ADD_VIDEO_FOR_LATER, () => {
    const newVideo: Video = { description: '',  thumbnailUrl: 'fakeURL', title: 'fakeTitle', videoId: 'someId' };
    const action = addVideoForLater(newVideo);
    it('Should add a new video', () => {
      state = videosReducer(state, action);
      expect(state.savedForLater).toContain(newVideo);
    });
  });
});