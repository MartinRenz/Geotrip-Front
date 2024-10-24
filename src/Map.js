import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import userIcon from "./assets/icons/userIcon";
import uIcon from './assets/icons/user-icon.png'
import geoTripIcon from './assets/icons/geo-trip-icon.png'
import SearchBar from './components/SearchBar/SearchBar';
import Icon from './components/Icon/Icon';
import ErrorNotification from "./ErrorNotification";
import "leaflet/dist/leaflet.css";

function Map() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  // Atualiza a localização do usuário.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.warn(position.coords.latitude, position.coords.longitude)
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError("Erro ao obter localização do usuário.");
          console.error("Erro ao obter localização:", error);
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
      <SearchBar/>
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
          icon={userIcon} 
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
        <ErrorNotification message="B" onClose="A"></ErrorNotification>
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