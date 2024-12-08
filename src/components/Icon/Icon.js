import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Icon.css';
import ExpandedMenu from '../ExpandedMenu/ExpandedMenu';
import settingsIcon from '../../../src/assets/icons/settings-icon.png';
import editProfileIcon from '../../../src/assets/icons/edit-profile-icon.png';
import pointHistoryIcon from '../../../src/assets/icons/point-history-icon.png';
import pointNewIcon from '../../../src/assets/icons/point-new-icon.png';
import stampGalleryIcon from '../../../src/assets/icons/stamp-gallery-icon.png';
import logOutIcon from '../../../src/assets/icons/log-out-icon.png';
import PointInsertMenu from '../PointInsertMenu/PointInsertMenu';
import ProfileMenu from '../EditProfileMenu/ProfileMenu';
import { useNavigate } from 'react-router-dom';

function Icon({ bottom, left, right, icon, iconType, flexDirection, userId, userName }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPointInsertOpen, setIsPointInsertOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const containerRef = useRef(null);

  const containerStyle = {
    left: left || 'auto',
    right: right || 'auto',
    bottom: bottom,
    flexDirection: flexDirection || 'column',
  };

  const guestProfileMenuItems = [
    { icon: settingsIcon, component: null, name: 'Settings' },
    { icon: logOutIcon, component: 'LogoutButton', name: 'Log-out' },
  ];

  const guestPointMenuItems = [
    { icon: pointHistoryIcon, component: null, name: 'History' },
  ];

  const profileMenuItems = [
    { icon: settingsIcon, component: null, name: 'Settings' },
    { icon: editProfileIcon, component: 'EditProfileMenu', name: 'Edit' },
    { icon: stampGalleryIcon, component: null, name: 'Stamps' },
    { icon: logOutIcon, component: 'LogoutButton', name: 'Log-out' },
  ];

  const pointMenuItems = [
    { icon: pointNewIcon, component: 'PointInsertMenu', name: 'Insert' }, // Identifying it for handling
    { icon: pointHistoryIcon, component: null, name: 'History' },
  ];

  const handleLogout = (e) => {
    navigate('/login', { state: { userId: null } });
  }

  const showToast = (message, successfully) => {
    if(successfully)
    {
      toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
    else
    {
      toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
  };

  function handleExpandIcon() {
    setIsExpanded((prev) => !prev);
  }

  function handleMenuItemClick(item) {
    if (item.component === 'PointInsertMenu') {
      setIsPointInsertOpen(true);
    }

    if (item.component === 'EditProfileMenu') {
      setIsEditProfileOpen(true);
    }

    if (item.component === 'LogoutButton') {
      handleLogout();
    }

    setIsExpanded(false);
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
            items={userId !=null ? profileMenuItems : guestProfileMenuItems}
            onClickItem={handleMenuItemClick}
          />
        )}
        {isExpanded && iconType === 'PointIcon' && (
          <ExpandedMenu
            items= {userId ? pointMenuItems : guestPointMenuItems}
            onClickItem={handleMenuItemClick}
          />
        )}
      </div>

      {isEditProfileOpen && (
        <ProfileMenu
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          userId={userId}
          userName={userName}
          isOwnProfile={true}
        />
      )}
      {/* Render PointInsertMenu if open */}
      {isPointInsertOpen && (
        <PointInsertMenu
          isOpen={isPointInsertOpen}
          onClose={() => setIsPointInsertOpen(false)}
          onConfirm={(pointData) => {
            window.alert('Point created!');
          }}
          userId={userId}
          showToast={showToast}
        />
      )}

      <ToastContainer />
    </>
  );
}

export default Icon;
