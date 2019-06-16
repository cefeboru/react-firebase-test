import Axios from 'axios';

export class YoutubeService {
    /**
     *
     */
  apiBase: string = 'https://www.googleapis.com/youtube/v3';
  searchUrl: string = `${this.apiBase}/search`;
  apiKey: string;
  constructor() {
    this.apiKey = process.env.FIREBASE_API_KEY;
  }

  async searchVideos(query: string, maxResults = 30) {
    const requestUrl = `${this.searchUrl}?maxResults=${maxResults}&&part=id,snippet&type=video&key=${this.apiKey}&q=${query}`;
    const response = await Axios.get(requestUrl);
    return response.data;
  }
}
export interface SearchVideosResponse {
  items: SearchItem[];
  nextPageToken: string;
}

export interface SearchItem {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      },
    };
  };
}

export default new YoutubeService();