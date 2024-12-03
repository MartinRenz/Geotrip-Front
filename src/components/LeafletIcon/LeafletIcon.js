import L from "leaflet";
import './LeafletIcon.css'; 
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

function createCustomIcon(color = "#FD7B03") {
  const svg = `
    <svg width="40" height="56" viewBox="0 0 40 56" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_314_111)">
        <path d="M7.67792 49.3299C6.59398 51.001 4 50.2333 4 48.2415L4 20C4 18.8954 4.89543 18 6 18L24.3188 18C25.9048 18 26.8598 19.7578 25.9967 21.0884L7.67792 49.3299Z" fill="${color}"/>
        <circle cx="20" cy="19" r="16" fill="${color}"/>
        <circle cx="20" cy="19" r="8" fill="white"/>
      </g>
      <defs>
        <filter id="filter0_d_314_111" x="0" y="0" width="40" height="55.2451" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="1"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_314_111"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_314_111" result="shape"/>
        </filter>
      </defs>
    </svg>
  `;

  const svgEncoded = encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");
  const dataUri = `data:image/svg+xml;charset=utf-8,${svgEncoded}`;

  return new L.Icon({
    iconUrl: dataUri,
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    className: 'custom-marker',
  });
}

const leafletIcon = createCustomIcon();
export default leafletIcon;