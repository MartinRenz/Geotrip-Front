import './PointMenu.css'

function PointMenu({ point, onClose }) {
    return (
        <div className="pointMenuOverlay" onClick={onClose}>
            <div className="pointMenu" onClick={(e) => e.stopPropagation()}>
                <h3>{point.name}</h3>
                <p>ID: {point.id}</p>
                <p>Latitude: {point.latitude}</p>
                <p>Longitude: {point.longitude}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}

export default PointMenu