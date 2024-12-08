import React, { useState } from "react";
import { useEffect } from 'react';
import editImage from "../../assets/icons/edit.png";
import "./ProfileMenu.css"

function ProfileMenu({ isOpen, onClose, userId, userName, isOwnProfile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);

    useEffect(() => {
        function handleOverlayClick(e) {
            if (e.target.classList.contains('pointMenuOverlay')) {
                onClose();
            }
        }
        window.addEventListener('click', handleOverlayClick);

        return () => {
            window.removeEventListener('click', handleOverlayClick);
        };
    }, [onClose]);

    const handleInputChange = (e) => {
        setNewUserName(e.target.value);
    };

    const handleSaveClick = () => {
        // Seta novo UserName
        setIsEditing(false);
    };

    return isOpen ? (
        <div className="profileMenuOverlay" onClick={onClose}>
            <div className="profileMenuContainer" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="profileCloseButton">✕</button>
                <div className="profileNameContainer">
                    <h3 className="username">
                        {isOwnProfile && !isEditing && (
                            <img
                                src={editImage}
                                onClick={() => setIsEditing(true)} // Switch to edit mode when clicked
                                alt="Editar campo"
                                className="profileEditButton"
                            />
                        )}
                        {isEditing ? (
                            <input
                                type="text"
                                value={newUserName}
                                onChange={handleInputChange}
                                onBlur={handleSaveClick} // Save the new name when the input loses focus
                                autoFocus
                                className="profileNameInput"
                            />
                        ) : (
                            <span>{userName}</span> // Show the name when not in edit mode
                        )}
                    </h3>
                    <h3 className="profileLabel">
                        's Profile
                    </h3>
                </div>
            </div>
        </div >
    ) : null;
}

export default ProfileMenu;