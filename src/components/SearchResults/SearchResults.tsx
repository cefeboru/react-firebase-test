import React from 'react';
import { Col, Row, Spin } from 'antd';
import Loader from 'react-loading';
import { SearchItem } from '../../modules/YoutubeService';
import { SingleVideo } from '../SingleVideo/SingleVideo';
import style from './SearchResults.module.scss';

export interface SearchResultsProps {
  isLoading: boolean;
  searchResults: SearchItem[];
  onResultSelect: (videoId: string) => any;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ isLoading, searchResults, onResultSelect }) => {
  const isLoadingRowProps = isLoading && { type:'flex', justify:'space-around', align:'middle' } as any;
  return (
  <Row type='flex' justify='center' className={style.content}>
    <Row gutter={24} className={`${style.grid} ${isLoading && style.loading}`} {...isLoadingRowProps}>
      {
        isLoading
          // ? <Col><Loader type='spin' className={style.loader} color='black' height='150px' width='150px'/></Col>
          ? <Spin tip='Loading...' />
          : searchResults.map((sr, index) => <Col
              xs={20}
              sm={12}
              md={8}
              xl={6}
              xxl={4}
              key={index}
            >
             <SingleVideo searchItem={sr} onClick={onResultSelect}/>
            </Col>)
      }
    </Row>
  </Row>);
};