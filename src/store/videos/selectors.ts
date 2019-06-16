import { VideosState } from './state';

export function hasSearchResultsSelector(videosState: VideosState) {
  return videosState.search.results.length > 0;
}

export const isVideoSavedForLaterSelector = (videosState: VideosState) => (videoId: string): boolean => {
  return (videoId in videosState.savedForLater);
}