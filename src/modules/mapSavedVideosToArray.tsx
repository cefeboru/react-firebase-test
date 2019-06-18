import { SavedForLaterMap } from '../store/videos/state';
import { SearchItem } from './YoutubeService';

export function mapSavedVideosToArray(savedVideos: SavedForLaterMap): SearchItem[] {
  return Object.keys(savedVideos).map(key => savedVideos[key]);
}
