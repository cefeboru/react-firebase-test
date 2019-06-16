import React from 'react';
import { SearchItem } from '../../modules/YoutubeService';
import style from './SingleVideo.module.scss';
import moment from 'moment';

export interface SingleVideoProps {
  searchItem: SearchItem;
  onClick: (videoId: string) => any;
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
    <img src={url} alt={title} onClick={() => onClick(videoId)} />
    <h4 className={style.ellipsis} title={title} >{title}</h4>
    <p className={style.ellipsis} title={description}>{description}</p>
    <span>{moment(publishedAt).fromNow()}</span>
  </div>);
};
