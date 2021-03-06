import { SearchItem } from '../../modules/YoutubeService';

export interface Video {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export interface VideosState {
  search: {
    text: string;
    results: SearchItem[];
    isSearching: boolean;
    error: string;
    nextPageToken: string;
  };
  player: {
    isPlaying: boolean;
    videoId: string;
  };
  recommended: SearchItem[];
  savedForLater: SavedForLaterMap;
}

export interface SavedForLaterMap {
  [key: string]: SearchItem;
}

export const videosInitialState: VideosState = {
  search: {
    isSearching: false,
    results: [],
    text: '',
    error: '',
    nextPageToken: '',
  },
  player: {
    isPlaying: false,
    videoId: '',
  },
  savedForLater: {},
  recommended: [],
};
