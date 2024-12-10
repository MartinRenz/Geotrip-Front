import React, { useEffect } from "react";
import "./PointHistoryMenu.css";
import PointList from "../PointList/PointList";

function PointHistoryMenu({ isOpen, onClose, points }) {
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
                <button onClick={onClose} className="historyCloseButton">✕</button>
                <PointList
                    points={points}
                    map={null}
                />
            </div>
        </div>
    ) : null;
}

export default PointHistoryMenu;
