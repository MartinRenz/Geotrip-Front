import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leafletIcon from "../../components/LeafletIcon/LeafletIcon.js";
import uIcon from '../../assets/icons/user-icon.png'
import geoTripIcon from '../../assets/icons/geo-trip-icon.png'
import SearchBar from '../../components/SearchBar/SearchBar';
import Icon from '../../components/Icon/Icon';
import PointMenu from '../../components/PointMenu/PointMenu.js'
import { getPointsByCoordinates } from '../../services/pointApi.js';  
import { useLocation } from 'react-router-dom';
import ErrorNotification from "../../ErrorNotification";
import "leaflet/dist/leaflet.css";

function Map() {
  const locationData = useLocation();
  const { userId } = locationData.state || {};
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  const handleSearch = (searchTerm) => {
    if(searchTerm)
      mapRef.current.setView([searchTerm.latitude, searchTerm.longitude], 18);
  };

  function HandleIsPointOwner(point) {
    // TODO: CHECAR ID DO USUARIO SE EH IGUAL A ID DO PONTO SELECIONADO
    // RETORNAR TRUE SE SIM
    return true;
  }

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

  // Captura os limites do mapa
  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      const handleMoveEnd = async () => {
        const bounds = map.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
  
        // Criando o objeto para enviar à API com as coordenadas
        const coordinates = {
          northEast: {
            latitude: northEast.lat,
            longitude: northEast.lng,
          },
          southWest: {
            latitude: southWest.lat,
            longitude: southWest.lng,
          },
        };
  
        console.log("Visible area:", coordinates);
  
        try {
          // Chamando o método getPointsByCoordinates e passando as coordenadas
          const data = await getPointsByCoordinates({northEast: coordinates.northEast, southWest: coordinates.southWest});
          console.warn(data.points)
          setPointsOfInterest(data.points);
          console.warn(pointsOfInterest)
        } catch (error) {
          console.error('Error fetching points:', error);
        }
      };
  
      // Captura quando o usuário move ou altera o zoom do mapa
      map.on("moveend", handleMoveEnd);
  
      // Limpar o evento quando o componente for desmontado
      return () => {
        map.off("moveend", handleMoveEnd);
      };
    }
  }, [mapRef.current]);

  // Renderiza uma mensagem de erro caso ocorra.
  if (error) {
    return <div>{error}</div>;
  }

  console.warn("userId", userId)

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <SearchBar pointsOfInterest={pointsOfInterest} onSearch={handleSearch} />
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
        />
        {pointsOfInterest.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
            icon={leafletIcon}
            eventHandlers={{
              click: () => {
                setSelectedPoint(poi);
              },
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              }
            }}
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
        iconType="ProfileIcon"
        flexDirection="row"
      />
      <Icon
        bottom="20px"
        right="20px"
        icon={geoTripIcon}
        iconType="PointIcon"
        flexDirection="row-reverse"
      />
      {selectedPoint && (
        <PointMenu
          point={selectedPoint}
          onClose={() => setSelectedPoint(null)}
          isOwner={HandleIsPointOwner(selectedPoint)}
        />
      )}
    </div>
  );
}

export default Map;