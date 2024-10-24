import React from 'react';
import './Icon.css'
import { click } from '@testing-library/user-event/dist/click';
import { useState } from 'react';
import ExpandedMenu from '../ExpandedMenu/ExpandedMenu';
import settingsIcon from '../../../src/assets/icons/settings-icon.png'
import editProfileIcon from '../../../src/assets/icons/edit-profile-icon.png'
import pointHistoryIcon from '../../../src/assets/icons/point-history-icon.png'
import pointNewIcon from '../../../src/assets/icons/point-new-icon.png'
import stampGalleryIcon from '../../../src/assets/icons/stamp-gallery-icon.png'

function Icon({ bottom, left, right, icon, iconType, flexDirection }) {
  const [isExpanded, ExpandIcon] = useState(false);

  const containerStyle = {
    left: left ? left : 'auto',
    right: right ? right : 'auto',
    bottom: bottom,
    flexDirection: flexDirection && flexDirection,
  };

  function HandleExpandIcon() {
    ExpandIcon((isExpanded) => !isExpanded);
  }

  return (
    <div className="icon-container" style={containerStyle}>
      <img src={icon} alt="User Icon" className="icon" onClick={HandleExpandIcon} />
      {isExpanded && iconType === "ProfileIcon" && (<ExpandedMenu items={[settingsIcon, editProfileIcon, stampGalleryIcon]}></ExpandedMenu>)}
      {isExpanded && iconType === "PointIcon" && (<ExpandedMenu items={[pointNewIcon, pointHistoryIcon]} ></ExpandedMenu>)}
    </div>
  );
};

export default Icon;