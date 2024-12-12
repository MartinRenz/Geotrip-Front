import React, { useState, useEffect, useRef } from 'react';
import './PointMenu.css';
import placeHolder from '../../assets/icons/arco-ufsm.jpg';
import Spinner from "../../components/Spinner/Spinner";
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { deletePointOfInterest } from '../../services/pointApi'; 
import { userCheckin, userCheckout, getCheckinInfo } from '../../services/userPointsApi';

function PointMenu({ point, userId, onClose, isOwner, showToast }) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [checkInCount, setCheckInCount] = useState(0);
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [profileUserId, setProfileUserId] = useState(null);

    useEffect(() => {
        const fetchCheckinInfo = async () => {
          try {
            setIsLoading(true);
            const data = await getCheckinInfo(userId, point.id);
            const response = data.data;
            setCheckInCount(response.total_interactions);
            setHasCheckedIn(response.user_interacted);
            setIsLoading(false);
          } catch (err) {
            setIsLoading(false);
            setError(err.error || 'Failed to fetch check-in information.');
          }
        };
    
        fetchCheckinInfo();
      }, [userId, point.id]);

      async function handleCheckButton() {
        try {
            if(userId == null) {
                showToast("You must be a user to check in.", false);
                return;
            }
            setIsLoading(true);
            if (hasCheckedIn) {
                await userCheckout(userId, point.id);
                setHasCheckedIn(false);
                setCheckInCount((prev) => (prev > 0 ? prev - 1 : 0));
            } else {
                await userCheckin(userId, point.id);
                setHasCheckedIn(true);
                setCheckInCount((prev) => prev + 1);
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            showToast("Error in the check action.", false);
        }
    }    

    const handleDeleteButton = async () => {
        try {
            onClose();
            await deletePointOfInterest(point.id);
            showToast("Point deleted successfully!", true);
        } catch (error) {
            setError('Error deleting point.');
            showToast("Failed to delete point", false);
        }
    };

    const openProfileMenu = () => {
        if (point.userId) {
            setProfileUserId(point.userId); // Set the userId of the creator
            setIsProfileMenuOpen(true); // Open the profile menu
        }
    };

    return (
        <div className="pointMenuOverlay" onClick={onClose}>
            <div className="pointMenuContainer" onClick={(e) => e.stopPropagation()}>
                <div className="pointMenuHeader">
                    <button onClick={onClose} className="closeButton">✕</button>
                    <img src={placeHolder} alt='UFSM'></img>
                    <h3>{point.name}</h3>
                    <p>{point.description}</p>
                    {point.email && (
                        <p
                            style={{ marginTop: 2, cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                            onClick={openProfileMenu}
                        >
                            <strong>Creator:</strong> {point.email}
                        </p>
                    )}
                    <p className="errorMessage">{error}</p>
                    {isOwner && (
                        <button className="deleteButton" onClick={handleDeleteButton}>
                            Delete
                        </button>
                    )}
                </div>
                <div className="pointMenuContent">
                    <div className="pointMenuCheckInField">
                        <span style={{ marginLeft: '20px', color: 'red', fontWeight: 'bold' }}>
                            {checkInCount}
                        </span>
                        <h3>Checked-in</h3>
                        <button onClick={handleCheckButton} disabled={isLoading}>
                            {isLoading ? <Spinner /> : (hasCheckedIn ? 'Check-out' : 'Check-in')}
                        </button>
                    </div>
                </div>
            </div>
            {isProfileMenuOpen && (
                <ProfileMenu
                    isOpen={isProfileMenuOpen}
                    onClose={() => setIsProfileMenuOpen(false)}
                    userId={profileUserId}
                    isOwnProfile={isOwner}
                    userName={point.userName}
                />
            )}
        </div>
    );
}

export default PointMenu;
