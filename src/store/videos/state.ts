export interface Video {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export interface VideosState {
  searchText: string;
  searchResults: any[];
  savedForLater: Video[];
}

export const videosInitialState: VideosState = {
  searchResults: [],
  searchText: '',
  savedForLater: [],
};
