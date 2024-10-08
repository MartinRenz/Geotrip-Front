import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SideMenu from "./SideMenu"
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41], // Tamanho do ícone
  iconAnchor: [12, 41], // Âncora do ícone (para posicionamento)
  popupAnchor: [1, -34], // Âncora do popup relativo ao ícone
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41], // Tamanho da sombra
});

function SimpleMap() {
  const [location, setLocation] = useState({ latitude: -29.69377634864591, longitude: -53.85432519207483 }); // Coordenadas padrão
  const [sideMenu, setSubMenu] = useState(false); // Coordenadas padrão
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setLocation({
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          // });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não é suportada pelo navegador.");
    }
  }, []);

  console.warn(location.longitude, location.latitude)

  return (
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
      <Marker position={[location.latitude, location.longitude]} icon={customIcon} eventHandlers={{
    click: (e) => {
      setSubMenu(true)
    },
    }}>
        {/* <Popup>
          Você está aqui!
        </Popup> */}
      </Marker>
    </MapContainer>
  );
}

export default SimpleMap;