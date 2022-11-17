import { Icon } from 'leaflet';
import bikemarker0 from "../assets/icon-bike-marker-grey.svg";
import bikemarker1 from '../assets/icon-bike-marker-blue.svg';
import bikemarker2 from "../assets/icon-bike-marker-purple.svg";

//ICON
function createIcon(name) {
  return new Icon({
    iconUrl: name,
    iconSize: [41, 47]
  })
}

export default function availabilityNum(options) {
  if (options == 0) {
    return createIcon(bikemarker0);
  } else if (options <= 5) {
    return createIcon(bikemarker1);
  } else {
    return createIcon(bikemarker2);
  }
}
