import React, { useState, useEffect, useRef } from 'react';
import './PointMenu.css';
import placeHolder from '../../assets/icons/arco-ufsm.jpg';
import Spinner from "../../components/Spinner/Spinner";
import { deletePointOfInterest } from '../../services/pointApi'; 
import { userCheckin, userCheckout, getCheckinInfo } from '../../services/userPointsApi';

function PointMenu({ point, userId, onClose, isOwner, showToast }) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [checkInCount, setCheckInCount] = useState(0);
    const [hasCheckedIn, setHasCheckedIn] = useState(false);

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

    return (
        <div className="pointMenuOverlay" onClick={onClose}>
            <div className="pointMenuContainer" onClick={(e) => e.stopPropagation()}>
                <div className="pointMenuHeader">
                    <button onClick={onClose} class="closeButton">✕</button>
                    <img src={placeHolder} alt='UFSM image'></img>
                    <h3>{point.name}</h3>
                    <p>{point.description}</p>
                    {point.email && <p style={{marginTop: 2}}><strong>Creator:</strong> {point.email}</p>}
                    {/* {isOwner && (<button onClick={handleDeleteButton} class="deleteButton">🗑️</button>)} */}
                    <p className="errorMessage">{error}</p>
                    {isOwner && (<button className="deleteButton" onClick={handleDeleteButton}>
                        Delete
                    </button>)}
                </div>
                <div className="pointMenuContent">
                    <div className="pointMenuCheckInField">
                        <span style={{marginLeft: '20px', color: 'red', fontWeight: 'bold' }}>
                            {checkInCount}
                        </span>
                        <h3>people have...</h3>
                        <button onClick={handleCheckButton} disabled={isLoading}>
                            {isLoading ? <Spinner /> : (hasCheckedIn ? 'Check-out' : 'Check-in')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PointMenu;
