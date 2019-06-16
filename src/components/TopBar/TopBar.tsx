import React from 'react';
import { Row, Col, Button } from 'antd';
import { Search } from '..';
import style from './TopBar.module.scss';

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
    <Row type='flex' justify='space-between' className={style.topBar}>
      <Col xs={22} sm={18} md={16} xl={10}>
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
  );
}