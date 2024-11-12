import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import "./Register.css";

function Login() {
    const navigate = useNavigate();

    function HandleRegisterButton() {
        navigate("/map");
    }

    return (
        <div className="registerContainer">
            <img src={logo} className="logo" alt="GeoTrip logo"></img>
            <div>
                <label for="email"> E-mail </label>
                <input type="text" id="email" name="email" placeholder="Your e-mail"></input>
                <label for="password"> Password </label>
                <input type="password" id="password" name="password" placeholder="Your password"></input>
                <input type="password" id="password" name="password" placeholder="Confirm your password"></input>
                <input type="button" className="confirmRegisterButton" value="Sign up" onClick={HandleRegisterButton}/>
            </div>
        </div>
    );
}

export default Login;