import React from 'react';
import { SearchItem } from '../../modules/YoutubeService';
import style from './SingleVideo.module.scss';
import moment from 'moment';
import { Icon } from 'antd';

export interface SingleVideoProps {
  searchItem: SearchItem;
  onClick: (videoId: string) => any;
  saveForLater: (video: SearchItem) => void;
  isSavedForLater: (videoId: string) => boolean;
}

export const SingleVideo: React.FC<SingleVideoProps> = ({
  searchItem,
  onClick,
  saveForLater,
  isSavedForLater,
}) => {
  const {
    id: { videoId },
    snippet: { title, description, thumbnails, publishedAt },
  } = searchItem;
  const { url } = thumbnails.medium;
  return (
  <div className={style.container}>
    <div className={style.thumbnail}>
      <img src={url} alt={title} title='Play video' onClick={() => onClick(videoId)} />
      {
        isSavedForLater(videoId)
          ? <Icon type='check' title='Saved' className={style.addForLater} />
          : <Icon type='folder-add' title='Add for later' className={style.addForLater} onClick={() => saveForLater(searchItem)} />
      }
    </div>
    <h4 className={style.ellipsis} title={title} >{title}</h4>
    <p className={style.ellipsis} title={description}>{description}</p>
    <span>{moment(publishedAt).fromNow()}</span>
  </div>);
};
