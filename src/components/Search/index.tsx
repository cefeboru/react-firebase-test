import React from 'react';
import { Button, Icon } from 'antd';
import Input from 'antd/lib/input/Input';

export interface SearchProps {
  searchText: string;
  updateSearchText: (newText: string) => void;
  clearSearch: () => any;
  onSearch: (searchText: any) => any;
}

export const Search: React.FC<SearchProps> = ({ searchText, updateSearchText, clearSearch, onSearch }) => {
  return (
      <Input
        placeholder='Search Videos'
        value={searchText}
        onChange={({ target: { value } }) => updateSearchText(value)}
        addonAfter={
            searchText
            ? <Icon type='close' onClick={clearSearch} />
            : <Icon  type='search' onClick={() => onSearch(searchText)} />
        }
      />
  );
};