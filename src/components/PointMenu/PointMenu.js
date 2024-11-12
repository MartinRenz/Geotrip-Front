import './PointMenu.css';
import placeHolder from '../../assets/icons/placeholder.jpg';

function PointMenu({ point, onClose }) {
    function HandleCheckInButton() {
        // INCREMENTA CHECK-IN DO PONTO
    }

    return (
        <div className="pointMenuOverlay" onClick={onClose}>
            <div className="pointMenuContainer" onClick={(e) => e.stopPropagation()}>
                <div className="pointMenuHeader">
                    <button onClick={onClose} class="closeButton">✕</button>
                    <h3 style={{ textAlign: 'center' }}>{point.name}</h3>
                    <img src={placeHolder} alt='gato makonha'>
                    </img>
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
