import React from 'react';
import '../style/ScrollingText.css';

const ScrollingText = () => {
  return (
    <div className="scrolling-text-container">
      <div className="scrolling-text-inner" style={{ '--marquee-speed': '20s', '--direction': 'scroll-left' }} role="marquee">
        <div className="scrolling-text">
          <div className="scrolling-text-item">
            <p><b style={{color:"red"}}>New Update!</b> <i style={{color:"blue"}}>This is under Testing model final  model will come soon...</i></p>
          </div>
          {/* Add More Items Here */}
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;
