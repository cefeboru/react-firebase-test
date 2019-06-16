import React from 'react';
import { Col, Row, Spin } from 'antd';
import { SearchItem } from '../../modules/YoutubeService';
import { SingleVideo } from '../SingleVideo/SingleVideo';
import style from './VideoResults.module.scss';

export interface VideoResultsProps {
  isLoading: boolean;
  searchResults: SearchItem[];
  onResultSelect: (videoId: string) => any;
  saveVideoForLater: any;
  isVideoSavedForLater: (videoId: string) => boolean;
}

export const VideoResults: React.FC<VideoResultsProps> = ({ isLoading, searchResults, onResultSelect, saveVideoForLater, isVideoSavedForLater }) => {
  const isLoadingRowProps = isLoading && { type:'flex', justify:'space-around', align:'middle' } as any;
  return (
  <Row type='flex' justify='center' className={style.content}>
    <Row gutter={24} className={`${style.grid} ${isLoading && style.loading}`} {...isLoadingRowProps}>
      {
        isLoading
          ? <Spin tip='Loading...' />
          : searchResults.map((sr, index) => <Col
              xs={20}
              sm={12}
              md={8}
              xl={6}
              xxl={4}
              key={index}
            >
             <SingleVideo searchItem={sr} onClick={onResultSelect} saveForLater={saveVideoForLater} isSavedForLater={isVideoSavedForLater}/>
            </Col>)
      }
    </Row>
  </Row>);
};