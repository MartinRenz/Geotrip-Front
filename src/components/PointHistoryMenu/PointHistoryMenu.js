import React, { useEffect } from "react";
import "./PointHistoryMenu.css";
import PointList from "../PointList/PointList";

function PointHistoryMenu({ isOpen, onClose, points, pointListClickHandler }) {
    useEffect(() => {
        function handleOverlayClick(e) {
            if (e.target.classList.contains('historyMenuOverlay')) {
                onClose();
            }
        }
        window.addEventListener('click', handleOverlayClick);

        return () => {
            window.removeEventListener('click', handleOverlayClick);
        };
    }, [onClose]);

    return isOpen ? (
        <div className="historyMenuOverlay" onClick={onClose}>
            <div className="historyMenuContainer" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ textAlign: 'center', margin: 0, color: "#FD7B03" }}>Point history</h3>
                <button onClick={onClose} className="historyCloseButton">✕</button>
                <PointList
                    points={points}
                    map={null}
                    pointListClickHandler={pointListClickHandler}
                />
            </div>
        </div>
    ) : null;
}

export default PointHistoryMenu;
