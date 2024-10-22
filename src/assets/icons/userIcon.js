import L from "leaflet";
import markerIcon from "./icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

const userIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [45, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  // shadowUrl: markerShadow,
  // shadowSize: [41, 41],
});

export default userIcon;