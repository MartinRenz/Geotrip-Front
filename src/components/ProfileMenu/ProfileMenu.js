import React, { useState } from "react";
import { useEffect } from 'react';
import { createUser } from "../../services/userApi";
import editImage from "../../assets/icons/edit.png";
import "./ProfileMenu.css"
import { getUserById, editUser } from "../../services/userApi";
import { getPointsByOwnerId } from "../../services/pointApi";
import Spinner from "../../components/Spinner/Spinner";
import PointList from "../PointList/PointList";
import userImage from '../../../src/assets/icons/ash.png';
import { toast } from "react-toastify";

function ProfileMenu({ isOpen, onClose, userId, userName, isOwnProfile, pointListClickHandler }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState("");
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
    const [oldValue, setOldValue] = useState({
        email: "",
        username: "",
        password: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await getUserById(userId);
                const userData = response.user
                setNewUserName(userData.username);
                setEmail(userData.email);
                setOldValue({
                    email: userData.email,
                    username: userData.username,
                    pasword: ""
                });
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

    const handleEditUsername = () => {
        if(!isUsernameEditable)
        {
            setNewUserName("")
        }
        else
        {
            setError(null);
            setNewUserName(oldValue.username)
        }
        setIsUsernameEditable(!isUsernameEditable);
    }

    const handleEditPassword = () => {
        if(isPasswordEditable)
            setError(null);
        setPassword("")
        setIsPasswordEditable(!isPasswordEditable);    
    }

    const handleEditEmail = () => {
        if(!isEmailEditable)
        {
            setEmail("")
        }
        else
        {
            setError(null);
            setEmail(oldValue.email)
        }
        setIsEmailEditable(!isEmailEditable);    
    }

    const validateUsername = () => {
        if (newUserName.length < 5 || newUserName.length > 15) {
            return "Username must have between 5 and 15 characters.";
        }
        return null;
    };

    const validateEmail = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = !regex.test(email)
            ? "E-mail is in an invalid format."
            : null;

        return isValidEmail;
    };

    const validatePassword = () => {
        if (password.length <= 3) {
            return "Password is in an invalid format, and must have between 4 and 20 characters.";
        }
        return null;
    };

    const handleEditButton = async () => {
        try {
            setIsLoading(true);
            let validationError = null;
    
            if (isUsernameEditable) {
                if(!newUserName.trim())
                {
                    setError("Username field is empty.");
                    setIsLoading(false);
                    return;
                }

                validationError = validateUsername();
                if (validationError) {
                    setError(validationError);
                    setIsLoading(false);
                    return;
                }
            }
    
            if (isEmailEditable) {
                if(!email.trim())
                {
                    setError("E-mail field is empty.");
                    setIsLoading(false);
                    return;
                }

                validationError = validateEmail();
                if (validationError) {
                    setError(validationError);
                    setIsLoading(false);
                    return;
                }
            }

            if (isPasswordEditable) {
                if(!password.trim())
                {
                        setError("Password field is empty.");
                        setIsLoading(false);
                        return;
                }

                validationError = validatePassword();
                if (validationError) {
                    setError(validationError);
                    setIsLoading(false);
                    return;
                }
            }
    
            const updatedFields = {};
            if (newUserName !== oldValue.username) updatedFields.username = newUserName;
            if (email !== oldValue.email) updatedFields.email = email;
            if (password.trim() !== "") updatedFields.password = password;
    
            if (Object.keys(updatedFields).length === 0) {
                setError("No changes were made.");
                setIsLoading(false);
                return;
            }
    
            // Se não houver erro, você pode chamar a API
            const data = await editUser(userId, updatedFields);
            toast.success(data.message, {
                containerId: 'GlobalApplicationToast'
            });
            setError(null);
            onClose();
            setIsLoading(false);
        } catch (err) {
            setError(err.error || 'Something went wrong.');
            setIsLoading(false);
            setMessage('');
        }
    };

    // const handleInputChange = (e) => {
    //     setNewUserName(e.target.value);
    // };

    // const handleSaveClick = () => {
    //     // Seta novo UserName
    //     setIsEditing(false);
    // };

    return isOpen ? (
        <div className="profileMenuOverlay" onClick={onClose}>
            <div className="profileMenuContainer" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="profileCloseButton">✕</button>
                <div className="profileNameContainer">
                    <h3 style={{ textAlign: 'center', margin: 0, color: "#FD7B03" }}>My Profile</h3>
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
                            maxLength={30}
                            disabled={!isUsernameEditable || isLoading}
                            required
                        />
                        <img
                            src={editImage}
                            alt="Edit"
                            onClick={handleEditUsername}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="emailInputContainer">
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={30}
                            disabled={!isEmailEditable || isLoading}
                            required
                        />
                        <img
                            src={editImage}
                            alt="Edit"
                            onClick={handleEditEmail}
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
                            maxLength={20}
                            disabled={!isPasswordEditable || isLoading}
                            required
                        />
                        <img
                            src={editImage}
                            alt="Edit"
                            onClick={ handleEditPassword }
                            disabled={isLoading}
                        />
                    </div>
                    <p className="errorMessage" style={{paddingBottom: 10}}>{error}</p>
                    {(isEmailEditable || isPasswordEditable || isUsernameEditable) && (
                        <button
                            className={`editButton ${isLoading ? "loading" : ""}`}
                            onClick={handleEditButton}
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner color={"#FD7B03"} /> : "Edit"}
                        </button>
                    )}
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
                <h3 style={{ textAlign: 'center', margin: 0, color: "#FD7B03" }}>My Points</h3>
                <PointList
                    points={userPoints}
                    pointListClickHandler={pointListClickHandler}
                />
            </div>
        </div >
    ) : null;
}

export default ProfileMenu;