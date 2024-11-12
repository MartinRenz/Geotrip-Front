import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import leafletIcon from "../LeafletIcon/LeafletIcon.js";
import 'leaflet/dist/leaflet.css';
import './PointInsertMenu.css';

function PointInsertMenu({ isOpen, onClose, onConfirm }) {
    const [pointName, setPointName] = useState('');
    const [error, setError] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const mapRef = useRef(null);

    function MapClickHandler() {
        useMapEvents({
            click(e) {
                setSelectedPosition(e.latlng);
            },
        });
        return null;
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    setError("Erro ao obter localização do usuário.");
                    console.error("Erro ao obter localização:", error);
                },
                {
                    enableHighAccuracy: true, // Habilita alta precisão
                    timeout: 10000, // Tempo máximo de espera pela resposta em ms
                    maximumAge: 0,  // Não utilizar cache
                }
            );
        } else {
            setError("Geolocalização não é suportada pelo navegador.");
        }
    }, []);

    useEffect(() => {
        if (mapRef.current && location.latitude && location.longitude) {
            mapRef.current.setView([location.latitude, location.longitude], 18);
        }
    }, [location]);


    useEffect(() => {
        function handleOverlayClick(e) {
            if (e.target.classList.contains('pointMenuOverlay')) {
                onClose();
            }
        }
        window.addEventListener('click', handleOverlayClick);

        return () => {
            window.removeEventListener('click', handleOverlayClick);
        };
    }, [onClose]);

    const handleConfirm = () => {
        if (selectedPosition && pointName.trim() !== '') {
            onConfirm({ name: pointName, position: selectedPosition });
            onClose();
        } else {
            alert('Please provide a name and select a point on the map.');
        }
    };

    return isOpen ? (
        <div className="pointInsertMenuOverlay" onClick={onClose}>
            <div className="pointInsertMenuContainer" onClick={(e) => e.stopPropagation()}>
                <input
                    type="text"
                    placeholder="Enter Point Name"
                    value={pointName}
                    onChange={(e) => setPointName(e.target.value)}
                    className="pointMenuInput"
                />
                <div className="miniMapContainer">
                    <MapContainer
                        ref={mapRef}
                        center={[location.latitude, location.longitude]}
                        zoom={18}
                        style={{ width: '100%', height: '200px' }}
                        zoomControl={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                        dragging={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        {selectedPosition && (
                            <Marker position={selectedPosition} icon={leafletIcon} />
                        )}
                        <MapClickHandler />
                    </MapContainer>
                </div>
                <button className="confirmButton" onClick={handleConfirm}>
                    Confirm
                </button>
            </div>
        </div>
    ) : null;
}

export default PointInsertMenu;
