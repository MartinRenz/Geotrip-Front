import L from "leaflet";
import markerIcon from "../../assets/icons/icon.png";
import './LeafletIcon.css'; 
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

const leafletIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: 'custom-marker',
  // shadowUrl: markerShadow,
  // shadowSize: [41, 41],
});

export default leafletIcon;