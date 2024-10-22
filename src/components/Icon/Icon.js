import React from 'react';
import './Icon.css'

function Icon({ bottom, left, right, icon }) {
  const containerStyle = {
    position: 'absolute',
    bottom: bottom,
    left: left ? left : 'auto',
    right: right ? right : 'auto',
    zIndex: 1000,
  };

  return (
    <div className="icon-container" style={containerStyle}>
      <img src={icon} alt="User Icon" className="icon" />
    </div>
  );
};

export default Icon;