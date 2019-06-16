import { VideosState } from './state';

export function hasSearchResultsSelector(videosState: VideosState) {
  return videosState.search.results.length > 0;
}