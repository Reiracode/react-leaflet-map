// import { useState } from "react";
// // way1 contry 
// import MapArea from "./components/MapArea";
// import CountryButtons from "./components/CountryButtons";
// import "./styles.css";a
import Header from "./layout/header";
import Main from "./layout/main";

import React, { useState } from "react";
import "./styles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import marker from './assets/icon-user-position-mobile.svg'
// import { Icon } from 'leaflet'
// const myIcon = new Icon({
//   iconUrl: marker,
//   iconSize: [32, 32]
// })

 //-----way2
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


import MapWrapper from "./components/MapWrapper";
import MapTest from "./components/MapTest";

export default function App() {
  const [coordinate, setCoordinate] = useState({
    latitude: 35.6803997,
    longitude: 139.7690174,
    capital: "Tokyo"
  }); 


  
  // ---- way2
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;


  const position = [35.6803997, 139.7690174];

  function MyComponent() {
    const map = useMapEvents({
      dragend: (e) => {
        console.log("mapCenter", e.target.getCenter());
        console.log("map bounds", e.target.getBounds());
      }
    });
    return null;
  }


  return (
    <div className="App">

      {/* <Header  />
      <Main/> */}


      {/* <MapWrapper /> */}
     < MapTest/>  
      {/* way1 contry  */}
      {/* <MapArea coordinate={coordinate} />
      <CountryButtons setCoordinate={setCoordinate} /> */}

      {/* <MapWrapper/> */}
      
      {/* ===========drag components================= */}
      {/* <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyComponent />
        <Marker position={position} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}

     
    </div>


 
  );

}

// import React from "react";


// function App() {
//   return (
//     <>
//       <Header />
//       <Main />
//     </>
//   );
// }

// export default App;
