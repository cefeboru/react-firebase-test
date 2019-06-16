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

  async searchVideos(query: string, maxResults = 15) {
    const response = await Axios.get(`${this.searchUrl}?maxResults=${maxResults}&&part=id,snippet&type=video&key=${this.apiKey}&q=${query}`);
    return response.data;
  }
}
export interface SearchVideosResponse {
  items: any[];
  nextPageToken: string;
}

export default new YoutubeService();