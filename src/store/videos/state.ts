export interface Video {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export interface VideosState {
  search: {
    text: string;
    results: any[];
    isSearching: boolean;
    error: string;
    nextPageToken: string;
  };
  savedForLater: Video[];
}

export const videosInitialState: VideosState = {
  search: {
    isSearching: false,
    results: [],
    text: '',
    error: '',
    nextPageToken: '',
  },
  savedForLater: [],
};
