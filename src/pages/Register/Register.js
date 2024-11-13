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
            setError(err.error || 'Something went wrong');
            setMessage('');
        }
    };

    return (
        <div className="registerContainer">
            <img src={logo} className="logo" alt="GeoTrip logo" />
            <div>
                <label htmlFor="email"> E-mail </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Your e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password"> Password </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword"> Confirm Password </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                    type="button"
                    className="confirmRegisterButton"
                    value="Sign up"
                    onClick={handleRegisterButton}
                />
            </div>

            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            {message && <div style={{ color: 'green', textAlign: 'center' }}>{message}</div>}
        </div>
    );
}

export default Register;