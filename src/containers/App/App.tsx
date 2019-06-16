import React from 'react';
import Login from '../Login/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { VideosState } from '../../store/videos/state';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { updateSearchText } from '../../store/videos/actions';
import 'antd/dist/antd.css';
import { Button, Icon, Row, Col } from 'antd';
import { Search } from '../../components/Search/Search';
import { thunkSignOut } from '../../store/system/thunks';
import style from './App.module.scss';
import { thunkSearchVideos, thunkClearSearch } from '../../store/videos/thunks';
import { hasSearchResultsSelector } from '../../store/videos/selectors';

interface Props {
  videos: VideosState;
  onSearchTextChange: typeof updateSearchText;
  signOut: any;
  hasSearchResults: boolean;
  onSearch: any;
  clearSearch: any;
}

export const App: React.FC<Props> = ({ videos, onSearchTextChange, signOut, hasSearchResults, onSearch, clearSearch }) => {
  return (
    <Router>
      <Login>
        <Row type='flex'  justify='space-between' className={style.topBar}>
          <Col xs={22} sm={18} md={16} xl={10}>
            <Search
              searchText={videos.search.text}
              clearSearch={clearSearch}
              onSearch={onSearch}
              updateSearchText={onSearchTextChange}
              hasSearchResults={hasSearchResults}
              isLoading={videos.search.isSearching}
            />
          </Col>
          <Col>
            <Button icon='logout' onClick={signOut} className={style.logoutButton}/>
          </Col>
        </Row>
        <Row>
          { videos.search.results.map((sr, index) => <Col key={index}>
            <h3>{sr.snippet.title}</h3>
            <p>{sr.snippet.description}</p>
            <img src={sr.snippet.thumbnails.default.url} />
          </Col>)}
        </Row>
      </Login>
    </Router>
  );
};

function mapStateToProps(state: AppState) {
  return {
    videos: state.videos,
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
  },
)(App);
