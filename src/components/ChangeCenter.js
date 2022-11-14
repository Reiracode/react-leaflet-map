import { useMap, useMapEvents } from "react-leaflet";

const ChangeCenter = (props) => {
  const map = useMap();
  map.setView(props.center);
  return null;
};

 


export { ChangeCenter };


