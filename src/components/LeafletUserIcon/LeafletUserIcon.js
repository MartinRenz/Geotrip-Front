import L from "leaflet";
import './LeafletUserIcon.css';
import selfIcon from '../../assets/icons/self-icon.png';

function userIcon() {
  return new L.Icon({
    iconUrl: selfIcon,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20],
    className: 'user-marker',
  });
}

export default userIcon;