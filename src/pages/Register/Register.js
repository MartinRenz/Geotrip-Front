import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userApi";
import logo from "../../assets/icons/logo.png";
import "./Register.css";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [message, setMessage] = useState("");

    const maxEmailLength = 80;
    const maxPasswordLength = 20;

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

    const validateConfirmPassword = () => {
        if (confirmPassword.length <= 3) {
            setConfirmPasswordError("Password is in an invalid format, and must have between 4 and 20 characters.")
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return;
        }
        setConfirmPasswordError(null)
    };

    const handleRegisterButton = async () => {
        try {
            if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
                validateEmail();
                validatePassword();
                validateConfirmPassword();
                return;
            }
            if (emailError != null || passwordError != null || confirmPasswordError) {
                return;
            }
            const username = email;
            const data = await createUser(username, email, password);
            setMessage(data.message);
            setError(null);
            navigate("/map", { state: { userId: data.userId } });
        } catch (err) {
            setError(err.error || 'Something went wrong with the register.');
            setMessage('');
        }
    };

    const handleLoginAccess = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="registerContainer">
            <img src={logo} className="logo" alt="GeoTrip logo" />
            <div>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={
                        (e) => e.target.value.length <= maxEmailLength &&
                            setEmail(e.target.value)
                    }
                    onBlur={validateEmail}
                    onFocus={() => setEmailError(null)}
                    style={{
                        borderColor: emailError == null ? 'transparent' : 'red',
                    }}
                    required
                />
                <p className="errorInput">{emailError}</p>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        (e) => e.target.value.length <= maxPasswordLength &&
                            setPassword(e.target.value)
                    }
                    onBlur={validatePassword}
                    onFocus={() => setPasswordError(null)}
                    style={{
                        borderColor: passwordError == null ? 'transparent' : 'red',
                    }}
                    required
                />
                <p className="errorInput">{passwordError}</p>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={
                        (e) => e.target.value.length <= maxPasswordLength &&
                            setConfirmPassword(e.target.value)
                    }
                    onBlur={validateConfirmPassword}
                    onFocus={() => setConfirmPasswordError(null)}
                    style={{
                        borderColor: confirmPasswordError == null ? 'transparent' : 'red',
                    }}
                    required
                />
                <p className="errorInput">{confirmPasswordError}</p>
                <p className="errorMessage">{error}</p>
                <input
                    type="button"
                    className="confirmRegisterButton"
                    value="Sign up"
                    onClick={handleRegisterButton}
                />
                <p className="infoMessage">Return to <a href="#" onClick={handleLoginAccess}>Login</a></p>
            </div>
        </div>
    );
}

export default Register;