import React, { useState, useEffect, useRef } from 'react';
import './PointMenu.css';
import placeHolder from '../../assets/icons/arco-ufsm.jpg';
import { deletePointOfInterest } from '../../services/pointApi'; 

function PointMenu({ point, onClose, isOwner }) {

    function HandleCheckInButton() {
        // INCREMENTA CHECK-IN DO PONTO
    }

    const handleDeleteButton = async () => {
        try {
            await deletePointOfInterest(point.id);
            console.log('Point deleted successfully');

            // Chame uma função de callback para atualizar a lista de pontos, se necessário
            onClose(); // Fecha o menu (ou ajuste para atualizar a interface)
            window.alert("Point deleted successfully")
        } catch (error) {
            console.error('Error deleting point:', error);
            alert('Erro ao deletar o ponto.');
        }
    };

    return (
        <div className="pointMenuOverlay" onClick={onClose}>
            <div className="pointMenuContainer" onClick={(e) => e.stopPropagation()}>
                <div className="pointMenuHeader">
                    <button onClick={onClose} class="closeButton">✕</button>
                    {isOwner && (<button onClick={handleDeleteButton} class="deleteButton">🗑️</button>)}
                    <h3 style={{ textAlign: 'center' }}>{point.name}</h3>
                    {/* <img src={placeHolder} alt='gato makonha'>
                    </img> */}
                </div>
                <div className="pointMenuContent">
                    <div className="pointMenuCheckInField">
                        <span style={{marginLeft: '20px', color: 'red', fontWeight: 'bold' }}>
                            {point.checkInCount || 0}
                        </span>
                        <h3>people have...</h3>
                        <button onClick={HandleCheckInButton}>Checked in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PointMenu;
