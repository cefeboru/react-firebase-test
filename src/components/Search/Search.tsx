import React from 'react';
import { Icon } from 'antd';
import Input from 'antd/lib/input/Input';

export interface SearchProps {
  searchText: string;
  updateSearchText: (newText: string) => void;
  clearSearch: () => any;
  onSearch: (searchText: any) => any;
  style?: React.CSSProperties;
  hasSearchResults: boolean;
  isLoading: boolean;
}

export const Search: React.FC<SearchProps> = ({ searchText, updateSearchText, clearSearch, onSearch, style, hasSearchResults, isLoading }) => {
  return (
      <Input
        style={{ ...style }}
        placeholder='Search Videos'
        value={searchText}
        onChange={({ target: { value } }) => updateSearchText(value)}
        onKeyDown={({ key }) => key === 'Enter' ? onSearch(searchText) : null}
        addonAfter={
            isLoading
            ? <Icon type='loading'/>
            : searchText && hasSearchResults
              ? <Icon type='close' onClick={clearSearch} title='Clear Search'/>
              : <Icon  type='search' onClick={() => onSearch(searchText)} title='Search'/>
        }
        disabled={isLoading}
      />
  );
};