import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import JSMpeg from '@cycjimmy/jsmpeg-player';

const StyledVideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  width: 100%;
`;

const PlayButton = styled.button`
  
  transform: translate(-50%, -50%);
  font-size: 14px;
  cursor: pointer;
`;

const Player = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const videoCanvasRef = useRef(null);

  useEffect(() => {
    if (  videoCanvasRef.current) {
      const videoUrl = 'ws://localhost:9999/';
      new JSMpeg.VideoElement(videoCanvasRef.current, videoUrl, { autoplay: true });
    }
  }, []);

  const handleButtonClick = () => {
    setShowCanvas(!showCanvas);
  };

  return (
    <div>
      {/* {showCanvas ? ( */}
        <StyledVideoContainer ref={videoCanvasRef}>
          {/* JSMpeg player will be initialized here when the canvas is visible */}
        </StyledVideoContainer>
      {/* ) : (
        <PlayButton onClick={handleButtonClick}>▶️ Play</PlayButton>
      )} */}
    </div>
  );
};

export default Player;
