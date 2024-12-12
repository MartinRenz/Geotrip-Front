import React, { useState } from "react";
import { useEffect } from 'react';
import { createUser } from "../../services/userApi";
import editImage from "../../assets/icons/edit.png";
import "./ProfileMenu.css"
import { getUserById } from "../../services/userApi";
import { getPointsByOwnerId } from "../../services/pointApi";
import Spinner from "../../components/Spinner/Spinner";
import PointList from "../PointList/PointList";
import userImage from '../../../src/assets/icons/ash.png';

function ProfileMenu({ isOpen, onClose, userId, userName, isOwnProfile, pointListClickHandler }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);
    const [email, setEmail] = useState("");
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [message, setMessage] = useState("");
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

    const validateUsername = () => {
        if (newUserName.length > 15) {
            setUsernameError("Username must have less then 15 characters.")
            return;
        }
        setUsernameError(null)
    };

    const validateEmail = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = !regex.test(email)
            ? "E-mail is in an invalid format."
            : null;

        setEmailError(isValidEmail)
    };

    const validatePassword = () => {
        if (password.length <= 3) {
            setPasswordError("Password is in an invalid format, and must have between 4 and 20 characters.")
            return;
        }
        setPasswordError(null)
    };

    const handleEditButton = async () => {
        try {
            setIsLoading(true);
            if (!newUserName.trim() || !email.trim() || !password.trim()) {
                validateUsername();
                validateEmail();
                validatePassword();
            }
            if (emailError != null || passwordError != null || confirmPasswordError) {
                setIsLoading(false);
                return;
            }
            const data = await createUser(newUserName, email, password);
            setMessage(data.message);
            setError(null);
            setIsLoading(false);
        } catch (err) {
            setError(err.error || 'Something went wrong with the register.');
            setIsLoading(false);
            setMessage('');
        }
    };


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
                    <h3 style={{ textAlign: 'center', margin: 0, color: "#FD7B03" }}>Edit User</h3>
                    <div className="profileImageContainer">
                        <img
                            src={userImage}
                            alt="User Profile Placeholder"
                            className="profileImage"
                        />
                    </div>
                    <div className="emailInputContainer">
                        <input
                            type="text"
                            placeholder="Username"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            onBlur={() => {
                                validateUsername();
                            }}
                            onFocus={() => setNewUserName(null)}
                            maxLength={30}
                            disabled={!isUsernameEditable || isLoading}
                            required
                        />
                        <img
                            src={editImage}
                            alt="Edit"
                            onClick={() => { setIsUsernameEditable(!isUsernameEditable); setNewUserName("") }}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="emailInputContainer">
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => {
                                validateEmail();
                            }}
                            onFocus={() => setEmailError(null)}
                            maxLength={30}
                            disabled={!isEmailEditable || isLoading}
                            required
                        />
                        <img
                            src={editImage}
                            alt="Edit"
                            onClick={() => { setIsEmailEditable(!isEmailEditable); setEmail("") }}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="emailInputContainer">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePassword}
                            onFocus={() => setPasswordError(null)}
                            maxLength={20}
                            disabled={!isPasswordEditable || isLoading}
                            required
                        />
                        <img
                            src={editImage}
                            alt="Edit"
                            onClick={() => { setIsPasswordEditable(!isPasswordEditable); setPassword("") }}
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        className={`editButton ${isLoading ? "loading" : ""}`}
                        onClick={handleEditButton}
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner color={"#FD7B03"} /> : "Edit"}
                    </button>
                    {/* <h3 className="username">
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
                    </h3> */}
                </div>
                {userPoints != null && <h3 style={{ textAlign: 'center', margin: 0, color: "#FD7B03" }}>User Points</h3>}
                <PointList
                    points={userPoints}
                    pointListClickHandler={pointListClickHandler}
                />
            </div>
        </div >
    ) : null;
}

export default ProfileMenu;