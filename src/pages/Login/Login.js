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
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [message, setMessage] = useState("");

    const validateEmail = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = !regex.test(email)
            ? "E-mail is in an invalid format."
            : null;

        setEmailError(isValidEmail)
    };

    const validatePassword = () => {
        if (password.length <= 3) {
            setPasswordError("Password is in an invalid format, and must be longer than 3 characters.")
            return;
        }
        setPasswordError(null)
    };

    const handleMapAccess = (e) => {
        e.preventDefault();
        navigate('/map');
    };

    async function HandleLoginButton() {
        try {
            if(!email.trim() || !password.trim()) {
                validateEmail();
                validatePassword();
                return;
            }
            if(emailError != null || passwordError != null) {
                return;
            }
            const data = await loginUser(email, password);
            setMessage(data.message);
            setError(null);
            navigate("/map");
        } catch (err) {
            setError(err.error || 'Something went wrong with the login.');
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
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    onFocus={() => setPasswordError(null)}
                    style={{
                        borderColor: passwordError == null ? 'transparent' : 'red',
                    }}
                    required
                />
                <p className="errorInput">{passwordError}</p>
                <p className="errorMessage">{error}</p>
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
                <p className="infoMessage"><a href="#" onClick={handleMapAccess}>Access without login</a></p>
            </div>
        </div>
    );
}

export default Login;