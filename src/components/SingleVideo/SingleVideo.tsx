import React from 'react';
import { SearchItem } from '../../modules/YoutubeService';
import style from './SingleVideo.module.scss';
import moment from 'moment';
import { Icon } from 'antd';

export interface SingleVideoProps {
  searchItem: SearchItem;
  onClick: (videoId: string) => any;
  // addForLater: () => any;
}

export const SingleVideo: React.FC<SingleVideoProps> = ({
  searchItem: {
    id: { videoId },
    snippet: { title, description, thumbnails, publishedAt },
  },
  onClick,
}) => {
  const { url } = thumbnails.medium;
  return (
  <div className={style.container}>
    <div className={style.thumbnail}>
      <img src={url} alt={title} onClick={() => onClick(videoId)} />
      <Icon type='folder-add' title='Add for later' className={style.addForLater}/>
    </div>
    <h4 className={style.ellipsis} title={title} >{title}</h4>
    <p className={style.ellipsis} title={description}>{description}</p>
    <span>{moment(publishedAt).fromNow()}</span>
  </div>);
};
