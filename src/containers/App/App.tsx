import React from 'react';
import Login from '../Login/Login';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { VideosState } from '../../store/videos/state';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { updateSearchText, addVideoForLater } from '../../store/videos/actions';
import { Row } from 'antd';
import { VideoResults, TopBar } from '../../components';
import { thunkSignOut } from '../../store/system/thunks';
import style from './App.module.scss';
import { thunkSearchVideos, thunkClearSearch, thunkStartPlayer, thunkStopPlayer, thunkGetRecommendedVideos } from '../../store/videos/thunks';
import { hasSearchResultsSelector, isVideoSavedForLaterSelector } from '../../store/videos/selectors';
import { SystemState } from '../../store/system/state';

interface Props {
  system: SystemState;
  videos: VideosState;
  onSearchTextChange: typeof updateSearchText;
  saveVideoForLater: typeof addVideoForLater;
  signOut: any;
  hasSearchResults: boolean;
  onSearch: (value: string) => void;
  clearSearch: () => void;
  playVideo: (videoId: string) => void;
  stopVideo: () => void;
  loadRecommendations: () => void;
  isVideoSavedForLater: (videoId: string) => boolean;
}

export const App: React.FC<Props> = (
  {
    videos,
    onSearchTextChange,
    signOut,
    hasSearchResults,
    onSearch,
    clearSearch,
    playVideo,
    saveVideoForLater,
    isVideoSavedForLater,
  }) => {
  return (
      <Router>
        <Login>
          <TopBar
            isLoading={videos.search.isSearching}
            searchText={videos.search.text}
            {...{ clearSearch, signOut, onSearch, hasSearchResults, onSearchTextChange }}
          />
          <Row type='flex' justify='space-between' className={style.content}>
            {
              videos.player.isPlaying
                ? <iframe
                    title={videos.player.videoId}
                    width='100%'
                    height='100%'
                    src={`https://www.youtube.com/embed/${videos.player.videoId}`}
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen>
                  </iframe>
                : <VideoResults
                    searchResults={videos.search.results}
                    isLoading={videos.search.isSearching}
                    onResultSelect={playVideo}
                    saveVideoForLater={saveVideoForLater}
                    isVideoSavedForLater={isVideoSavedForLater}
                  />
            }
          </Row>
        </Login>
      </Router>
  );
};

function mapStateToProps(state: AppState) {
  return {
    videos: state.videos,
    system: state.system,
    hasSearchResults: hasSearchResultsSelector(state.videos),
    isVideoSavedForLater: isVideoSavedForLaterSelector(state.videos),
  };
}

export default connect(
  mapStateToProps,
  {
    onSearchTextChange: updateSearchText,
    signOut: thunkSignOut,
    onSearch: thunkSearchVideos,
    clearSearch: thunkClearSearch,
    playVideo: thunkStartPlayer,
    stopVideo: thunkStopPlayer,
    loadRecommendations: thunkGetRecommendedVideos,
    saveVideoForLater: addVideoForLater,
  },
)(App);
