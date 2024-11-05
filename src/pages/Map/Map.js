import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leafletIcon from "../../components/LeafletIcon/LeafletIcon.js";
import uIcon from '../../assets/icons/user-icon.png'
import geoTripIcon from '../../assets/icons/geo-trip-icon.png'
import SearchBar from '../../components/SearchBar/SearchBar';
import Icon from '../../components/Icon/Icon';
import ErrorNotification from "../../ErrorNotification";
import "leaflet/dist/leaflet.css";

function Map() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  // Versão teste
  const pointsOfInterest = [
    { id: 1, name: 'Restaurante A', latitude: -29.6922331, longitude: -53.8571042 },
    { id: 2, name: 'Museu B', latitude: -29.6907624, longitude: -53.8547881 },
    { id: 3, name: 'Praça C', latitude: -29.6930283, longitude: -53.8556234 },
    { id: 4, name: 'Parque D', latitude: -29.6903856, longitude: -53.8580286 },
    { id: 5, name: 'Loja E', latitude: -29.6942150, longitude: -53.8534207 },
    { id: 6, name: 'Teatro F', latitude: -29.6911167, longitude: -53.8549531 },
  ];

  const handleSearch = (searchTerm) => {
    const foundPoint = pointsOfInterest.find(poi =>
      poi.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundPoint) {
      mapRef.current.setView([foundPoint.latitude, foundPoint.longitude], 18);
    }
  };

  // Atualiza a localização do usuário.
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

  // Centraliza o mapa na nova localização do usuário.
  useEffect(() => {
    if (mapRef.current && location.latitude && location.longitude) {
      mapRef.current.setView([location.latitude, location.longitude], 18);
    }
  }, [location]);

  // Renderiza uma mensagem de erro caso ocorra.
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <SearchBar pointsOfInterest={pointsOfInterest} onSearch={handleSearch}/>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={18}
        ref={mapRef}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={[location.latitude, location.longitude]} 
          icon={leafletIcon} 
          eventHandlers={{
            click: () => {
              console.warn("Clicou")
            },
          }}
        >
          {/* <Popup>
            <p>Popup</p>
          </Popup> */}
        </Marker>
        {/* <ErrorNotification message="B" onClose="A"></ErrorNotification> */}
        {pointsOfInterest.map((poi) => (
          <Marker 
            key={poi.id} 
            position={[poi.latitude, poi.longitude]} 
            icon={leafletIcon}
          >
            <Popup>
              <p>{poi.name}</p>
            </Popup>
          </Marker>
      ))}
      </MapContainer>
      <Icon 
        bottom="20px" 
        left="20px"
        icon={uIcon}
        iconType = "ProfileIcon" 
      />
      <Icon 
        bottom="20px" 
        right="20px"
        icon={geoTripIcon}
        iconType = "PointIcon"
        flexDirection = "row-reverse"
      />
    </div>
  );
}

export default Map;