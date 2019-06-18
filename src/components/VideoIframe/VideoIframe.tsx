import React from 'react';

export interface VideoIframeProps {
  videoId: string;
}

export const VideoIframe: React.FC<VideoIframeProps> = ({ videoId }) =>
  <iframe
    title={videoId}
    width='100%'
    height='100%'
    src={`https://www.youtube.com/embed/${videoId}`}
    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
    allowFullScreen>
  </iframe>;
