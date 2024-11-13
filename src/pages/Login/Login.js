import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userApi";
import logo from "../../assets/icons/logo.png";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    async function HandleLoginButton() {
        try {
            const data = await loginUser(email, password);
            setMessage(data.message);
            setError(null);
            navigate("/map");
        } catch (err) {
            setError(err.error || 'Something went wrong');
            setMessage('');
        }
    }

    function HandleRegisterButton() {
        navigate("/register");
    }

    return (
        <div className="loginContainer">
            <img src={logo} className="logo" alt="GeoTrip logo" />
            <div>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="button"
                    className="loginButton"
                    value="Sign in"
                    onClick={HandleLoginButton}
                />
                <input
                    type="button"
                    className="registerButton"
                    value="Sign up"
                    onClick={HandleRegisterButton}
                />
            </div>
        </div>
    );
}

export default Login;