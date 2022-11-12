import { useEffect, useMemo, useState } from 'react';


import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import tileLayer from '../utils/tileLayer';

// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow
// });

// L.Marker.prototype.options.icon = DefaultIcon;


const center = [52.22977, 21.01178];

const points = [
  {
    lat: 52.230020586193795,
    lng: 21.01083755493164,
    title: 'point 1'
  },
  {
    lat: 52.22924516170657,
    lng: 21.011320352554325,
    title: 'point 2'
  },
  {
    lat: 52.229511304688444,
    lng: 21.01270973682404,
    title: 'point 3'
  },
  {
    lat: 52.23040500771883,
    lng: 21.012146472930908,
    title: 'point 4'
  },
];

const MapWrapper = () => {
  const [map, setMap] = useState(null);
  const [text, setText] = useState(null)

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = `click marker, move`;
      setText(div);
      return div;
    };

    legend.addTo(map);

  }, [map]);

  const eventHandlers = useMemo(() => ({
    dragend(e) {
      text.innerHTML = e.target.getLatLng();
    },
  }), [text])

  return (
    <MapContainer
      whenCreated={setMap}
      center={center}
      zoom={18}
      scrollWheelZoom={false}
    >

      <TileLayer {...tileLayer} />

      {points.map(({ lat, lng, title }, index) => (
        <Marker
          eventHandlers={eventHandlers}
          key={index}
          draggable={true}
          autoPan={true}
          position={[lat, lng]}
          // icon={icon}
        >
          <Popup>{title}</Popup>
        </Marker>
      ))}

    </MapContainer>
  )
}

export default MapWrapper;