/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userApi";
import logo from "../../assets/icons/logo.png";
import "./Login.css";
import Spinner from "../../components/Spinner/Spinner";

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [error, setError] = useState(null);

    // Load credentials from localStorage
    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
        if(savedEmail || savedPassword)
            setRememberMe(true);
    }, []);

    // Validates email formatting using a REGEX.
    const validateEmail = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = !regex.test(email)
            ? "E-mail is in an invalid format."
            : null;

        setEmailError(isValidEmail);
    };

    // Validates password formatting.
    const validatePassword = () => {
        if (password.length <= 3 || password.length > 20) {
            setPasswordError(
                "Password is in an invalid format, and must have between 4 and 20 characters."
            );
            return;
        }
        setPasswordError(null);
    };

    const handleLoginButton = async () => {
        try {
            setIsLoading(true);
            if (!email.trim() || !password.trim()) {
                validateEmail();
                validatePassword();
                setIsLoading(false);
                return;
            }
            if (emailError != null || passwordError != null) {
                setIsLoading(false);
                return;
            }

            if (rememberMe) {
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
            } else {
                localStorage.removeItem("email");
                localStorage.removeItem("password");
            }

            const data = await loginUser(email, password);
            setError(null);
            setIsLoading(false);
            navigate("/map", { state: { userId: data.userId } });
        } catch (err) {
            setIsLoading(false);
            setError(err.error || "Something went wrong with the login.");
        }
    };

    const handleRegisterButton = () => {
        navigate("/register");
    };

    const handleMapAccess = (e) => {
        e.preventDefault();
        navigate('/map', { state: { userId: null } });
    };

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
                        borderColor: emailError == null ? "transparent" : "red",
                    }}
                    maxLength={30}
                    disabled={isLoading}
                    required
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleLoginButton();
                    }}
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
                        borderColor: passwordError == null ? "transparent" : "red",
                    }}
                    maxLength={20}
                    disabled={isLoading}
                    required
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleLoginButton();
                    }}
                />
                <p className="errorInput">{passwordError}</p>
                <p className="errorMessage">{error}</p>

                <div className="rememberMeContainer">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        disabled={isLoading}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>

                <button
                    className={`loginButton ${isLoading ? "loading" : ""}`}
                    onClick={handleLoginButton}
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : "Sign in"}
                </button>
                <button
                    className={"registerButton"}
                    onClick={handleRegisterButton}
                    disabled={isLoading}
                >
                    {"Sign up"}
                </button>
                <p className="infoMessage">
                    <a href="#" onClick={handleMapAccess}>Access without login</a>
                </p>
            </div>
        </div>
    );
}

export default Login;