import './PointMenu.css';
import placeHolder from '../../assets/icons/placeholder.jpg';

function PointMenu({ point, onClose }) {
    return (
        <div className="pointMenuOverlay" onClick={onClose}>
            <div className="pointMenuContainer">
                <div className="pointMenuHeader" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} class="closeButton">✕</button>
                    <h3 style={{ textAlign: 'center' }}>{point.name}</h3>
                    <img src={placeHolder} alt='gato makonha'>
                    </img>
                    {/* <p>ID: {point.id}</p>
                    <p>Latitude: {point.latitude}</p>
                    <p>Longitude: {point.longitude}</p> */}
                </div>
                <div className="pointMenuContent">
                    <div style={{ marginTop: '20px' }}>
                        <h4>Additional Information</h4>
                        <ul>
                            {Array.from({ length: 40 }, (_, i) => (
                                <li key={i}>Detail Item {i + 1}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PointMenu;
