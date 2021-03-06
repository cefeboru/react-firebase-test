import React from 'react';
import { ReactWrapper, shallow, mount } from 'enzyme';
import { Search, SearchProps } from './Search';
import { Icon } from 'antd';
import Input from 'antd/lib/input';

describe('<Search />', () => {
  let searchComponent: ReactWrapper;
  const onSearchMock = jest.fn();
  const clearSearchMock = jest.fn();
  const updateSearchTextMock = jest.fn();
  beforeEach(() => {
    searchComponent = mount(
      <Search
        onSearch={onSearchMock}
        searchText=''
        updateSearchText={updateSearchTextMock}
        clearSearch={clearSearchMock}
        hasSearchResults={false}
        isLoading={false}
      />,
    );
    onSearchMock.mockClear();
    clearSearchMock.mockClear();
    updateSearchTextMock.mockClear();
  });

  describe('When there are not search results', () => {
    let renderedIcon: ReactWrapper;
    beforeEach(() => {
      renderedIcon = searchComponent.find(Icon);
    });

    it('Should contain a search icon', () => {
      expect(renderedIcon.props()).toHaveProperty('type', 'search');
    });

    it('Should call the search method when clicking the icon', () => {
      renderedIcon.simulate('click');
      expect(onSearchMock).toHaveBeenCalled();
    });
  });

  describe('When search text is not empty and there are search results', () => {
    let renderedIcon: ReactWrapper;
    beforeEach(() => {
      searchComponent.setProps({ searchText: 'Some text', hasSearchResults: true });
      renderedIcon = searchComponent.find(Icon);
    });
    it('Should render a search icon', () => {
      expect(renderedIcon.props()).toHaveProperty('type', 'close');
    });
    it('Should call clear search method when clicking the icon', () => {
      renderedIcon.simulate('click');
      expect(clearSearchMock).toHaveBeenCalled();
    });
  });
});