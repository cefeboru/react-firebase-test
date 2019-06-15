import React from 'react';
import Login from '../../components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { VideosState } from '../../store/videos/state';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { updateSearchText } from '../../store/videos/actions';
import 'antd/dist/antd.css';
import { Button, Icon, Row, Col } from 'antd';
import { Search } from '../../components/Search';

interface Props {
  videos: VideosState;
  updateSearchText: typeof updateSearchText;
}

export const App: React.FC<Props> = (props) => {
  return (
    <Router>
      <Login>
        <Row>
          <Col>
            <Search
              searchText={props.videos.searchText}
              clearSearch={() => null}
              onSearch={() => null}
              updateSearchText={props.updateSearchText}
            />
          </Col>
        </Row>
        <Route exact path='/' component={() => <div>Home</div>} />
        <Route path='/later' component={() => <div>Later List</div>} />
      </Login>
    </Router>
  );
};

function mapStateToProps(state: AppState) {
  return {
    videos: state.videos,
  };
}

export default connect(
  mapStateToProps,
  { updateSearchText },
)(App);
