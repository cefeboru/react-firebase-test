import React from 'react';
import Login from '../Login/Login';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { VideosState } from '../../store/videos/state';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { updateSearchText } from '../../store/videos/actions';
import { Row } from 'antd';
import { SearchResults, TopBar } from '../../components';
import { thunkSignOut } from '../../store/system/thunks';
import style from './App.module.scss';
import { thunkSearchVideos, thunkClearSearch, thunkStartPlayer, thunkStopPlayer, thunkGetRecommendedVideos } from '../../store/videos/thunks';
import { hasSearchResultsSelector } from '../../store/videos/selectors';
import { SystemState } from '../../store/system/state';

interface Props {
  system: SystemState;
  videos: VideosState;
  onSearchTextChange: typeof updateSearchText;
  signOut: any;
  hasSearchResults: boolean;
  onSearch: (value: string) => void;
  clearSearch: () => void;
  playVideo: (videoId: string) => void;
  stopVideo: () => void;
  loadRecommendations: () => void;
}

export class App extends React.Component<Props> {

  render() {
    const { videos, onSearchTextChange, signOut, hasSearchResults, onSearch, clearSearch, playVideo } = this.props;
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
                : <SearchResults
                  searchResults={videos.search.results}
                  isLoading={videos.search.isSearching}
                  onResultSelect={playVideo}
                />
            }
          </Row>
        </Login>
      </Router>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    videos: state.videos,
    system: state.system,
    hasSearchResults: hasSearchResultsSelector(state.videos),
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
  },
)(App);
