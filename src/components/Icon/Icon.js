import React, { useState, useEffect, useRef } from 'react';
import './Icon.css';
import ExpandedMenu from '../ExpandedMenu/ExpandedMenu';
import settingsIcon from '../../../src/assets/icons/settings-icon.png';
import editProfileIcon from '../../../src/assets/icons/edit-profile-icon.png';
import pointHistoryIcon from '../../../src/assets/icons/point-history-icon.png';
import pointNewIcon from '../../../src/assets/icons/point-new-icon.png';
import stampGalleryIcon from '../../../src/assets/icons/stamp-gallery-icon.png';
import logOutIcon from '../../../src/assets/icons/log-out-icon.png';
import PointInsertMenu from '../PointInsertMenu/PointInsertMenu';

function Icon({ bottom, left, right, icon, iconType, flexDirection, userId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPointInsertOpen, setIsPointInsertOpen] = useState(false);
  const containerRef = useRef(null);

  const containerStyle = {
    left: left || 'auto',
    right: right || 'auto',
    bottom: bottom,
    flexDirection: flexDirection || 'column',
  };

  const profileMenuItems = [
    { icon: settingsIcon, component: null, name: 'Settings' },
    { icon: editProfileIcon, component: null, name: 'Edit' },
    { icon: stampGalleryIcon, component: null, name: 'Stamps' },
    { icon: logOutIcon, component: null, name: 'Log-out' },
  ];

  const pointMenuItems = [
    { icon: pointNewIcon, component: 'PointInsertMenu', name: 'Insert' }, // Identifying it for handling
    { icon: pointHistoryIcon, component: null, name: 'History' },
  ];

  function handleExpandIcon() {
    setIsExpanded((prev) => !prev);
  }

  function handleMenuItemClick(item) {
    if (item.component === 'PointInsertMenu') {
      setIsPointInsertOpen(true);
      setIsExpanded(false); // Close the expanded menu
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="icon-container" style={containerStyle} ref={containerRef}>
        {!isExpanded &&
          (<div className="icon-name">{iconType === 'ProfileIcon' ? 'Profile' : 'Points'}</div>)}
        <img
          src={icon}
          alt="User Icon"
          className="icon"
          onClick={handleExpandIcon}
        />

        {isExpanded && iconType === 'ProfileIcon' && (
          <ExpandedMenu
            items={profileMenuItems}
            onClickItem={handleMenuItemClick}
          />
        )}
        {isExpanded && iconType === 'PointIcon' && (
          <ExpandedMenu
            items={pointMenuItems}
            onClickItem={handleMenuItemClick}
          />
        )}
      </div>

      {/* Render PointInsertMenu if open */}
      {isPointInsertOpen && (
        <PointInsertMenu
          isOpen={isPointInsertOpen}
          onClose={() => setIsPointInsertOpen(false)}
          onConfirm={(pointData) => {
            window.alert('Point created!');
          }}
          userId={userId}
        />
      )}
    </>
  );
}

export default Icon;
