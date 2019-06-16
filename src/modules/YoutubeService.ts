import Axios from 'axios';

export default class YoutubeService {
  private apiBase: string = 'https://www.googleapis.com/youtube/v3';
  private searchUrl: string = `${this.apiBase}/search`;
  private apiKey: string;
  private accessToken: string = '';

  constructor(accessToken: string | undefined) {
    this.apiKey = process.env.FIREBASE_API_KEY;
    this.accessToken = accessToken || '';
    return this;
  }

  async searchVideos(query: string, maxResults = 30) {
    if (!this.accessToken) throw new Error('accessToken is not set');
    const requestUrl = `${this.searchUrl}?maxResults=${maxResults}`
    + `&part=id,snippet`
    + `&type=video`
    + `&key=${this.apiKey}`
    + `&q=${query}`
    + `&access_token=${this.accessToken}`;
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
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default: SearchItemThumbnail,
      medium: SearchItemThumbnail,
      high: SearchItemThumbnail,
    };
  };
}

export interface SearchItemThumbnail {
  url: string;
  width: number;
  height: number;
}