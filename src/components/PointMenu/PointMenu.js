import React, { useState, useEffect, useRef } from 'react';
import './PointMenu.css';
import placeHolder from '../../assets/icons/arco-ufsm.jpg';
import { deletePointOfInterest } from '../../services/pointApi'; 

function PointMenu({ point, onClose, isOwner, showToast }) {
    const [error, setError] = useState(null);

    function HandleCheckInButton() {
        // INCREMENTA CHECK-IN DO PONTO
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
                            {point.checkInCount || 0}
                        </span>
                        <h3>people have...</h3>
                        <button onClick={HandleCheckInButton}>Checked in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PointMenu;
