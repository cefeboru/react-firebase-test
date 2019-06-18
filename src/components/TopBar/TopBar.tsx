import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { Search } from '..';
import style from './TopBar.module.scss';
import { Link } from 'react-router-dom';

export interface TopBarProps {
  searchText: string;
  isLoading: boolean;
  clearSearch: () => void;
  onSearchTextChange: (value: string) => void;
  onSearch: (value: string) => void;
  signOut: () => void;
  hasSearchResults: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ searchText, isLoading, clearSearch, onSearchTextChange, onSearch, signOut, hasSearchResults }) => {
  return (
    <React.Fragment>
      <Row type='flex' justify='space-between' align='middle' className={style.topBar}>
        <Col className={style.navigation}>
          <Link to='/' className={style.link}>
            <Icon type='home' title='Home' />
          </Link>
          <Link to='/savedForLater' className={style.link}>
            <Icon type='menu' title='Saved videos'/>
          </Link>
        </Col>
        <Col xs={22} sm={20} md={18} xl={16} xxl={10} >
          <Search
            searchText={searchText}
            clearSearch={clearSearch}
            onSearch={onSearch}
            updateSearchText={onSearchTextChange}
            hasSearchResults={hasSearchResults}
            isLoading={isLoading}
          />
        </Col>
        <Col>
          <Button icon='logout' onClick={signOut} className={style.logoutButton} title='Logout' />
        </Col>
      </Row>
    </React.Fragment>
  );
};