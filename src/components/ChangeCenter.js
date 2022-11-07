import { useMap } from "react-leaflet";

const ChangeCenter = (props) => {
  const map = useMap();
  map.setView(props.center);
  return null;
};

export default ChangeCenter;
