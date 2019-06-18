import React from 'react';
import Login from '../Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { VideosState } from '../../store/videos/state';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { updateSearchText } from '../../store/videos/actions';
import { Row } from 'antd';
import { VideoResults, TopBar, VideoIframe } from '../../components';
import { thunkSignOut } from '../../store/system/thunks';
import style from './App.module.scss';
import * as videoThunks from '../../store/videos/thunks';
import { hasSearchResultsSelector, isVideoSavedForLaterSelector } from '../../store/videos/selectors';
import { SystemState } from '../../store/system/state';
import { mapSavedVideosToArray } from '../../modules/mapSavedVideosToArray';

interface Props {
  system: SystemState;
  videos: VideosState;
  onSearchTextChange: typeof updateSearchText;
  saveVideoForLater: any;
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
    videos: { recommended, search, savedForLater },
    onSearchTextChange,
    signOut,
    hasSearchResults,
    onSearch,
    clearSearch,
    saveVideoForLater,
    isVideoSavedForLater,
  }) => {
  return (
      <Router>
        <Login>
          <TopBar
            isLoading={search.isSearching}
            searchText={search.text}
            {...{ clearSearch, signOut, onSearch, hasSearchResults, onSearchTextChange }}
          />
          <Row type='flex' justify='space-between' className={style.content}>
            <Switch>
              <Route path='/' exact render={({ history }) =>
                <VideoResults
                  searchResults={hasSearchResults ? search.results : recommended }
                  isLoading={search.isSearching}
                  onResultSelect={(videoId: string) => history.push(`video/${videoId}`)}
                  saveVideoForLater={saveVideoForLater}
                  isVideoSavedForLater={isVideoSavedForLater}
                />}
              />
              <Route path='savedForLater' exact render={({ history }) =>
                <VideoResults
                  searchResults={mapSavedVideosToArray(savedForLater)}
                  isLoading={search.isSearching}
                  onResultSelect={(videoId: string) => history.push(`video/${videoId}`)}
                  saveVideoForLater={saveVideoForLater}
                  isVideoSavedForLater={isVideoSavedForLater}
                />
              }/>
              <Route path='/video/:id' render={props => <VideoIframe videoId={props.match.params.id}/>}/>
            </Switch>
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
    onSearch: videoThunks.thunkSearchVideos,
    clearSearch: videoThunks.thunkClearSearch,
    playVideo: videoThunks.thunkStartPlayer,
    stopVideo: videoThunks.thunkStopPlayer,
    loadRecommendations: videoThunks.thunkGetRecommendedVideos,
    saveVideoForLater: videoThunks.thunkAddVideoForLater,
  },
)(App);