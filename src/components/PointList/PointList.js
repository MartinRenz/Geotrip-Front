import React from "react";
import "./PointList.css"

function PointList({ points, pointListClickHandler }) {
    const handleClick = (point) => {
        if (point) {
            pointListClickHandler(point); // Adjust the zoom level as needed
        }
    };

    const createSvgImage = (color = "#FD7B03") => {
        const svg = `
          <svg width="40" height="56" viewBox="0 0 40 56" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_314_111)">
              <path d="M7.67792 49.3299C6.59398 51.001 4 50.2333 4 48.2415L4 20C4 18.8954 4.89543 18 6 18L24.3188 18C25.9048 18 26.8598 19.7578 25.9967 21.0884L7.67792 49.3299Z" fill="${color}"/>
              <circle cx="20" cy="19" r="16" fill="${color}"/>
              <circle cx="20" cy="19" r="8" fill="white"/>
            </g>
            <defs>
              <filter id="filter0_d_314_111" x="0" y="0" width="40" height="55.2451" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_314_111"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_314_111" result="shape"/>
              </filter>
            </defs>
          </svg>
        `;

        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

    }


    return (
        <div className="pointListContainer">
            {Array.isArray(points) && points.length > 0 ? (
                points.map((point, index) => (
                    <div
                        className="pointListItemContainer"
                        key={index}
                        onClick={() => handleClick(point)} // Navigate to the point
                        style={{ cursor: "pointer" }}
                    >
                        <div className="pointListItem">
                            <img
                                className="pointListItemIcon"
                                src={createSvgImage(point.color)}
                                alt={`${point.name} icon`}
                                style={{ width: "40px", height: "56px" }}
                            ></img>
                            <div className="pointListItemName">{point.name}</div>
                        </div>
                    </div>
                ))
            ) : (
                <h5
                    style={{
                        textAlign: "center",
                        margin: 0,
                        color: "#000000",
                    }}
                >
                    This point list is empty
                </h5>
            )}
        </div>
    );
}

export default PointList;
