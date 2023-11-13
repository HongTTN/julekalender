// VideoModal.js

import React from 'react';
import './VideoModal.css';

const VideoModal = ({ youtubeId, onClose }) => {
  const videoUrl = `https://www.youtube.com/embed/${youtubeId}`;
  console.log(videoUrl)

  return (
    <div className="video-modal-overlay" >
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          width="560"
          height="315"
          src={videoUrl}
          title="YouTube video"
          allowFullScreen
        ></iframe>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default VideoModal;
