import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ChangeCenter from "./ChangeCenter";

const MapArea = (props) => {
  const MapContainerStyle = {
    width: "400px",
    height: "300px",
    display: "inline-block",
    padding: "10px"
  };
  return (
    <MapContainer
      center={[props.coordinate.latitude, props.coordinate.longitude]}
      zoom={5}
      scrollWheelZoom={false}
      style={MapContainerStyle}
    >
      <ChangeCenter
        center={[props.coordinate.latitude, props.coordinate.longitude]}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[props.coordinate.latitude, props.coordinate.longitude]}
      >
        <Popup>{props.coordinate.capital}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapArea;
