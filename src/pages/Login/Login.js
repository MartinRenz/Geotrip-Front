import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    function HandleLoginButton() {
        navigate("/map");
    }

    return (
        <div className="loginContainer">
            <img src={logo} className="logo" alt="GeoTrip logo"></img>
            <div>
                <label for="email"> E-mail </label>
                <input type="text" id="email" name="email" placeholder="Your e-mail"></input>
                <label for="password"> Password </label>
                <input type="password" id="password" name="password" placeholder="Your password"></input>
                <input type="button" className="loginButton" value="Sign in" onClick={HandleLoginButton}/>
                <input type="button" className="registerButton" value="Sign up" />
            </div>
        </div>
    );
}

export default Login;