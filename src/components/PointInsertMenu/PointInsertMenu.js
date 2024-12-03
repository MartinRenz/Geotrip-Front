import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import createCustomIcon from "../LeafletIcon/LeafletIcon.js"
import 'leaflet/dist/leaflet.css';
import { createPointOfInterest } from '../../services/pointApi.js'
import './PointInsertMenu.css';
import { HuePicker } from 'react-color';

function PointInsertMenu({ isOpen, onClose, onConfirm, userId }) {
    const [pointName, setPointName] = useState('');
    const [pointNameError, setPointNameError] = useState(null);
    const [pointDescription, setPointDesc] = useState('');
    const [error, setError] = useState(null);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [selectedPosition, setSelectedPosition] = useState(null);
    const mapRef = useRef(null);
    const [currentColor, setCurrentColor] = useState("#FD7B03");
    const handleOnColorChangeComplete = (color) => {
        setCurrentColor(color.hex)
    }

    function MapClickHandler() {
        useMapEvents({
            click(e) {
                mapRef.current.setView([location.latitude, location.longitude], 18);
                setSelectedPosition(e.latlng);
            },
        });
        return null;
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setLocation(userLocation);
                    setSelectedPosition([userLocation.latitude, userLocation.longitude]);
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

    const handleConfirm = async () => {
        if (userId === null || userId === undefined) {
            setError('This option is only available to users logged in to the platform.');
            return;
        }
        if (selectedPosition && pointName.trim() !== '' && pointDescription.trim() !== '') {
            try {
                const response = await createPointOfInterest({
                    name: pointName,
                    description: pointDescription,
                    latitude: selectedPosition.lat,
                    longitude: selectedPosition.lng,
                    userId: userId,
                    color: currentColor
                });
                //onConfirm({ name: pointName, position: selectedPosition });
                onClose();
            } catch (error) {
                setError('Error creating point of interest. Please try again.');
            }
        } else {
            setError('Please provide a name, description, and select a point on the map.');
        }
    };

    const validatePointName = () => {
        console.warn(pointName)
        if (pointName.length <= 5) {
            setPointNameError("Name is in an invalid format, and must be longer than 5 characters.")
            return;
        }
        setPointNameError(null)
    };

    return isOpen ? (
        <div className="pointInsertMenuOverlay" onClick={onClose}>
            <div className="pointInsertMenuContainer" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} class="pointInsertcloseButton">✕</button>
                <h3 style={{ textAlign: 'center', margin: 0, color: "#FD7B03" }}>Create Point</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={pointName}
                    onChange={(e) => setPointName(e.target.value)}
                    maxLength={40}
                    required
                    className="pointMenuInput"
                />
                <textarea
                    placeholder="Description"
                    value={pointDescription}
                    onChange={(e) => setPointDesc(e.target.value)}
                    maxLength={140}
                    required
                    className="pointMenuTextarea"
                />
                <p className="errorInput">{pointNameError}</p>

                <HuePicker
                    color={currentColor}
                    onChangeComplete={handleOnColorChangeComplete}
                    disableAlpha={"true"}
                    width="auto">
                </HuePicker>

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
                            <Marker
                                position={selectedPosition} 
                                icon={createCustomIcon(currentColor)} 
                            />
                        )}
                        <MapClickHandler />
                    </MapContainer>
                </div>
                <p className="errorMessage">{error}</p>
                <button className="confirmButton" onClick={handleConfirm}>
                    Confirm
                </button>
            </div>
        </div>
    ) : null;
}

export default PointInsertMenu;
