import React from "react";
import "./Spinner.css";

function Spinner({ size = 20, color = "white", borderWidth = 4 }) {
    return (
        <div
            className="spinner"
            style={{
                width: size,
                height: size,
                borderColor: `rgba(255, 255, 255, 0.3)`,
                borderTopColor: color,
                borderWidth: borderWidth,
            }}
        ></div>
    );
}

export default Spinner;