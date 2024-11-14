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
    const [message, setMessage] = useState("");

    const handleRegisterButton = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const username = email;
            const data = await createUser(username, email, password);
            setMessage(data.message);
            setError(null);
            navigate("/map");
        } catch (err) {
            setError(err.error || 'Something went wrong with the login.');
            setMessage('');
        }
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p className="errorMessage">{error}</p>
                <input
                    type="button"
                    className="confirmRegisterButton"
                    value="Sign up"
                    onClick={handleRegisterButton}
                />
            </div>
        </div>
    );
}

export default Register;