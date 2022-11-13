import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, Tooltip   } from "react-leaflet";
import asyncGetGeolocation from "../utils/getGeolocation";
import "leaflet/dist/leaflet.css";
import "../index.css";
import { getAvailableBikes } from "../utils/fetchTdxApi";

import marker from '../assets/icon-user-position-mobile.svg';

import bikemarker0 from "../assets/icon-bike-marker-grey.svg";
import bikemarker1 from '../assets/icon-bike-marker-blue.svg';
import bikemarker2 from "../assets/icon-bike-marker-purple.svg";

import bicycleGreySvg from "../assets/icon-bicycle-grey.svg";
import parkingGreySvg from "../assets/icon-parking-grey.svg";
import { Icon } from 'leaflet';

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [32, 32]
})

let bikes;
//ICON
const bikeIcon0 = createIcon(bikemarker0);
const bikeIcon1 = createIcon(bikemarker1);
const bikeIcon2 = createIcon(bikemarker2);

function availabilityNum(options) {
  if (options === 0) {
    // return bikeIcon0;
    return createIcon(bikemarker0);
  } else if (options <= 5) {
    // return bikeIcon1;
    return createIcon(bikemarker1);
  } else {
    // return bikeIcon2;
    return createIcon(bikemarker2);
  }
}

function createIcon(name) {
  return  new Icon({
    iconUrl: name,
    iconSize: [41, 47]
  })
}

export default function MapTest() {
  // ---------way1
  const TAIPEI_COORDINATES = [35.4122, 139.4130];
  // const TAIPEI_COORDINATES = [25.0223245, 121.499514];
  
  const [userPosition, setUserPosition] = useState(null);
  const [dragposi, setDragposi] = useState(null);
  // const [userPosition, setUserPosition] = useState(position)
  const [getdata, setGetdata] = useState([]);


  //可複用 
  const getPosition = useCallback(async () => {
    //取得現在位子
    const urlocation = await asyncGetGeolocation();
    console.log("yourlocation" + urlocation)

    setUserPosition(urlocation);
    //取得現在位子，並以此取得bikes data
    const bikes = await getAvailableBikes(urlocation);
    setGetdata(bikes);
    console.log(bikes);
  }, [])

//get dragPosition ==> then get bikes
  async function getdragPosition() {
    console.log(dragposi);
    
    if (dragposi === null) {
      return
    } else {
      bikes = await getAvailableBikes(dragposi);
      setGetdata(bikes);
      console.log(bikes);
    }
  }


  function MyComponent() {
    const map = useMapEvents({
      dragend: (e) => {
        console.log("mapCenter", e.target.getCenter());
        const newposition = e.target.getCenter();
        const data1 = [newposition.lat, newposition.lng]
        setDragposi(data1);
        setUserPosition(data1);
      }
      // , locationfound(e) {
      //   setDragposi(data1);
      //   setUserPosition(data1);
      // }

    });
    // return null;
    return dragposi === null ? null : (
      <Marker position={dragposi}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  
 

  // useEffect(() => {
  //   drag2Position();
  // }, [drag2Position]);
 


  useEffect(() => {
    //loading時，就取得現在位子
    getPosition()
    console.log('getPosition in useEffect');
    // getdragPosition(dragposi);
  }, [getPosition]);

  
//loading  不用，當drap時才需要用
  useEffect(() => {
    if (dragposi) {
      console.log('getdragPosition in useEffect' + dragposi);
      // console.log(dragposi)
      getdragPosition(dragposi);
    }
  }, [dragposi]);


  // const BikeMydata = () => {
  //   console.log(getdata)
  //   const names = []
  //   // getdata.forEach((station, index) => { 
  //   //   console.log(station.stationName)
  //   // })
  //   getdata.forEach((station, index) => {
  //     names.push(
  //       < Marker
  //         icon={bikeIcon0}
  //         key={index}
  //         position={[station.stationPosition.lat, station.stationPosition.lng]}
  //       >
  //         {/* <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>{station.availableRentBikes}</Tooltip> */}
       
  //         <Popup>{station.stationName}</Popup>
  //       </Marker>)
  //   })

  //   return (
  //     <div className='container'>
  //       {names}
  //     </div>
  //   )
 
  // }
 //default : []  render marker
  function MultipleMarkers() {
    // const map = useMapEvents({
    //   click() {
    //     map.locate();
    //   }
    // });
    console.log(getdata)//old data
   
    if (getdata.length == 0) return;

    return getdata.map((station, index) => {
      const bikeversion = station.stationName.includes("2.0") ? "plus" : ""
      
      return (
        <Marker key={index}
          // icon={bikeIcon0}
          icon={availabilityNum(station.availableRentBikes)}
          position={[station.stationPosition.lat, station.stationPosition.lng]}
        >
        
          <Popup className="request-popup">
            <div className="bikeMarkers_popup">
              <h3 className="typography-bold typography-button">{station.stationName}</h3>
              <div className="popup_info">
                <div className="popup_bikes ">
                  <img src={bicycleGreySvg} alt="bicycle icon" />
                  <span className="quantity typography-bold typography-button">{station.availableRentBikes}</span>
                </div>
                <div className="popup_parks  ">
                  <img src={parkingGreySvg} alt="bicycle icon" />
                  <span className="quantity typography-bold typography-button">{station.availableReturnBikes}</span>
                </div>

              </div>
            </div>

          </Popup>

          <Tooltip direction="center" offset={[0, -4]} opacity={1} permanent>
           {station.availableRentBikes}
          </Tooltip>
          {/* <Popup>{Object.keys(elem).length > 0 ? elem.bodyfindSegnalazione[0][0].indirizzo + ' ' + elem.bodyfindSegnalazione[0][0].civico + ' ' + elem.bodyfindSegnalazione[0][0].quartiere : ''}</Popup> */}
        </Marker>
      );
    });
  }



  // const points = [
  //   {
  //     lat: 33.589803,
  //     lng: 130.420681,
  //     title: 'point 1'
  //   },
  //   {
  //     lat: 35.6895,
  //     lng: 139.69171,
  //     title: 'point 2'
  //   }
  // ];

  // const MyMarker = () => {
  //   const points = [
  //     {
  //       lat: 33.589803,
  //       lng: 130.420681,
  //       title: 'point 1'
  //     },
  //     {
  //       lat: 33.6895,
  //       lng: 139.69171,
  //       title: 'point 2'
  //     }];
  //   const names = []
  //   points.forEach(({ lat, lng, title }, index) => {
  //     names.push(
  //       < Marker
  //         key={index}
  //         position={[lat, lng]}
  //       // icon={bikeIcon}
  //       >
  //         <Popup>{title}</Popup>
  //       </Marker>)
  //   })

  //   return (
  //     <div className='container'>
  //       {names}
  //     </div>
  //   )
  // }

  return (
    userPosition ?
    <MapContainer
      center={userPosition}
      zoom={16}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* drag map */}
      <MyComponent />

      {/* bikemarker */}
      <MultipleMarkers />

      {/* user position */}
      <Marker position={userPosition} icon={myIcon}>
        <Popup>You're Here!</Popup>
      </Marker>
      </MapContainer>
      :null
  )

}