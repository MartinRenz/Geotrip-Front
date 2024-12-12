import React, { useState } from "react";
import { useEffect } from 'react';
import { createUser } from "../../services/userApi";
import editImage from "../../assets/icons/edit.png";
import "./UsersProfileMenu.css"
import { getUserById, editUser } from "../../services/userApi";
import { getPointsByOwnerId } from "../../services/pointApi";
import Spinner from "../../components/Spinner/Spinner";
import PointList from "../PointList/PointList";
import userImage from '../../../src/assets/icons/ash.png';
import { toast } from "react-toastify";

function UsersProfileMenu({ isOpen, onClose, userId, userName, isOwnProfile, pointListClickHandler }) {
    const [isLoading, setIsLoading] = useState(false);
    const [newUserName, setNewUserName] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);
    const [password, setPassword] = useState("");
    const [userPoints, setUserPoints] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await getUserById(userId);
                const userData = response.user
                setNewUserName(userData.username);
                setEmail(userData.email);
                setIsLoading(false);
            } catch (error) {
                console.error("Error in search users.");
                setIsLoading(false);
            }
        };

        if (isOpen) {
            fetchUserData();
        }
    }, [isOpen, userId]);

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

    useEffect(() => {
        // Fetch points when menu is open
        const fetchPoints = async () => {
            try {
                const data = await getPointsByOwnerId(userId);
                setUserPoints(data.points); // Update the state with fetched points
            } catch (error) {
                // Add toast
                console.error("Error fetching points of interest:", error);
            }
        };

        if (isOpen) {
            fetchPoints();
        }
    }, [isOpen, userId]);

    return isOpen ? (
        <div className="profileMenuOverlay" onClick={onClose}>
            <div className="profileMenuContainer" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="profileCloseButton">✕</button>
                <div className="profileNameContainer">
                    <h3 style={{ textAlign: 'center', margin: 0, color: "#FD7B03" }}>{newUserName + " Profile" || "User Profile"}</h3>
                    <div className="profileImageContainer">
                        <img
                            src={userImage}
                            alt="User Profile Placeholder"
                            className="profileImage"
                        />
                    </div>
                    <p>{email}</p>
                </div>
                <h3 style={{ textAlign: 'center', margin: 0, color: "#FD7B03" }}>User Points</h3>
                <PointList
                    points={userPoints}
                    pointListClickHandler={pointListClickHandler}
                />
            </div>
        </div >
    ) : null;
}

export default UsersProfileMenu;