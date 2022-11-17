import geolocactionSvg from "../assets/icon-geolocation.svg";

const GetLocationButton = ({ onMoveTo,isLocatingUser }) => {
  return (
    <button
      className="geolocation"
      onClick={onMoveTo}
      disabled={isLocatingUser ? true : false}
    >
      <img src={geolocactionSvg} alt="geolocation icon" />
    </button>
  )
}

export default GetLocationButton;