import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import uIcon from '../../assets/icons/user-icon.png';
import geoTripIcon from '../../assets/icons/geo-trip-icon.png';
import SearchBar from '../../components/SearchBar/SearchBar';
import Icon from '../../components/Icon/Icon';
import PointMenu from '../../components/PointMenu/PointMenu.js';
import { getPointsByCoordinates } from '../../services/pointApi.js';  
import { useLocation } from 'react-router-dom';
import ErrorNotification from "../../ErrorNotification";
import "leaflet/dist/leaflet.css";
import userIcon from "../../components/LeafletUserIcon/LeafletUserIcon.js";
import createCustomIcon from "../../components/LeafletIcon/LeafletIcon.js";

function Map() {
  const locationData = useLocation();
  const { userId } = locationData.state || {};
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const [historyPoints, setHistoryPoints] = useState([]);

  const updateHistoryPoints = (point) => {
    setHistoryPoints((prevHistory) => {
      const existingIndex = prevHistory.findIndex((p) => p.id === point.id);
  
      if (existingIndex !== -1) {
        prevHistory.splice(existingIndex, 1);
      }
  
      const updatedHistory = [point, ...prevHistory];
  
      return updatedHistory.slice(0, 10);
    });
  };

  const handleSearch = (searchTerm) => {
    if(searchTerm)
      mapRef.current.setView([searchTerm.latitude, searchTerm.longitude], 18);
  };

  function HandleIsPointOwner(point) {
    console.warn(point);
    if(point.user_id === userId)
      return true;

    return false;
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

  // Função para buscar pontos de interesse
  const fetchPoints = async (map) => {
    if (!map) return;

    const bounds = map.getBounds();
    const zoom = map.getZoom();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

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

    console.log("Fetching points for visible area:", coordinates);

    try {
      const data = await getPointsByCoordinates({
        northEast: coordinates.northEast,
        southWest: coordinates.southWest,
        zoom: zoom,
      });
      setPointsOfInterest(data.points);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  // Captura os limites do mapa e busca pontos ao carregar o mapa e ao mover.
  useEffect(() => {
    const map = mapRef.current;

    if (map) {
      // Buscar pontos ao carregar o componente
      fetchPoints(map);

      // Configurar evento "moveend"
      const handleMoveEnd = () => fetchPoints(map);
      map.on("moveend", handleMoveEnd);

      // Limpar evento ao desmontar o componente
      return () => {
        map.off("moveend", handleMoveEnd);
      };
    }
  }, [mapRef.current]);

  // Renderiza uma mensagem de erro caso ocorra.
  if (error) {
    return <div>{error}</div>;
  }

  console.warn("userId", userId);

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
          icon={userIcon()}
          eventHandlers={{
            click: () => {
              if (mapRef.current) {
                mapRef.current.setView([location.latitude, location.longitude]);
              }
            }
          }}
        />
        {pointsOfInterest.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
            icon={createCustomIcon(poi.color)}
            eventHandlers={{
              click: () => {
                if (mapRef.current) {
                  mapRef.current.setView([poi.latitude, poi.longitude]);
                }
                updateHistoryPoints(poi); 
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
          </Marker>
        ))}
      </MapContainer>
      <Icon
        bottom="20px"
        left="20px"
        icon={uIcon}
        iconType="ProfileIcon"
        flexDirection="row"
        userId={userId}
      />
      <Icon
        bottom="100px"
        left="20px"
        icon={geoTripIcon}
        iconType="PointIcon"
        flexDirection="row"
        userId={userId}
        historyPoints={historyPoints}
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
