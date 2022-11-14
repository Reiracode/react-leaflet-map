import React, { useState, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, Tooltip } from "react-leaflet";
import asyncGetGeolocation from "../utils/getGeolocation";
import { getAvailableBikes } from "../utils/fetchTdxApi";

import "leaflet/dist/leaflet.css";
import "../index.css";

import geolocactionSvg from "../assets/icon-geolocation.svg";
import marker from '../assets/icon-user-position-mobile.svg';
// import ChangeCenter from "./ChangeCenter";
import { ChangeCenter } from "./ChangeCenter";
import bikemarker0 from "../assets/icon-bike-marker-grey.svg";
import bikemarker1 from '../assets/icon-bike-marker-blue.svg';
import bikemarker2 from "../assets/icon-bike-marker-purple.svg";
import bicycleSvg from "../assets/icon-bicycle.svg";
import parkingSvg from "../assets/icon-parking.svg";
import bicycleGreySvg from "../assets/icon-bicycle-grey.svg";
import bicycleWhiteSvg from "../assets/icon-bicycle-white.svg";
import parkingGreySvg from "../assets/icon-parking-grey.svg";
import parkingWhiteSvg from "../assets/icon-parking-white.svg";
import { Icon } from 'leaflet';

// let bikes;
const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [32, 32]
})

//ICON
function createIcon(name) {
  return new Icon({
    iconUrl: name,
    iconSize: [41, 47]
  })
}

function availabilityNum(options) {
  if (options === 0) {
    return createIcon(bikemarker0);
  } else if (options <= 5) {
    return createIcon(bikemarker1);
  } else {
    return createIcon(bikemarker2);
  }
}


export default function MapTest() {
  // ---------way1
  const JAPAN_COORDINATES = [35.4122, 139.4130];
  // const TAIPEI_COORDINATES = [25.0223245, 121.499514];
  //position
  const [userPosition, setUserPosition] = useState(null);
  //drag position
  const [dragposi, setDragposi] = useState(null);
  //bikes
  const [getdata, setGetdata] = useState([]);

  const [isLocatingUser, setIsLocatingUser] = useState(true);
  //
  const [isDrag, setIsDrag] = useState(false);

  //找單車/車位
  const [isFindingBikes, setIsFindingBikes] = useState(true);

  const locatingMessage = (
    <div className="overlay">
      <span className="typography-bold typography-h4">定位中</span>
    </div>
  );

  function handleFindingType() {
    // setIsFindingBikes((bool) => !bool);
    setIsFindingBikes(!isFindingBikes);
  }

  //可複用 取得現在位子，並以此取得bikes data
  const getPosition = useCallback(async () => {
    const urlocation = await asyncGetGeolocation();
    console.log("--------yourlocation" + urlocation)
    setUserPosition(urlocation);
 
    const bikes = await getAvailableBikes(urlocation);
    setGetdata(bikes);
    console.log(bikes);

    setIsLocatingUser(false);

    //20221114-- setIsDrag(false);
  }, [])

  //重新定位button
  const getLocationButton = (
    <>
      <button
        className="geolocation"
        disabled={isLocatingUser ? true : false}
        onClick={getPosition}>
        <img src={geolocactionSvg} alt="geolocation icon" />
      </button>
      {/* <h1>{userPosition}</h1> */}
    </>

  );




  //get dragPosition ==> then get bikes
  async function getdragPosition() {
    console.log(" getdragPosition");
    console.log(dragposi);
    console.log(isDrag);

    if (dragposi === null) {
      return
    } else {
      const bikes = await getAvailableBikes(dragposi);
      setGetdata(bikes);
      console.log(bikes);
    }

    // if (isDrag == false) {
    //   console.log(userPosition)
    //   if (dragposi === null) {
    //     return
    //   } else {
    //     bikes = await getAvailableBikes(dragposi);
    //     setGetdata(bikes);
    //     console.log(bikes);
    //   }
    //   setIsDrag(true);
    // } else {
    //   console.log(userPosition)
    // }
  }

  // dragend 取得position  更新位子到 dragposi/userPosition
  function MyComponent() {
    const map = useMapEvents({
      dragend: (e) => {
        console.log("mapCenter", e.target.getCenter());
        const newposition = e.target.getCenter();
        const data1 = [newposition.lat, newposition.lng]
        setDragposi(data1);
        setUserPosition(data1);
      }
    });


    // isDrag === true ? setUserPosition(data1) : setUserPosition([25.0223285, 121.4994606]);
    // return null;
    return (
      // <Marker position={isDrag === true ? dragposi : userPosition} icon={myIcon}>
      <>
        {/* <DrapMap
          center={userPosition}
        /> */}
        <Marker position={userPosition} icon={myIcon}>
          <Popup>You are here</Popup>
        </Marker>
      </>

    )
  }


  //loading時，就取得現在位子
  useEffect(() => {
    getPosition()
    console.log('getPosition in useEffect');
  }, [getPosition]);


  //loading不用，當drap時才需要用 getPosition()
  useEffect(() => {
    //這邊要預防，onload => drap， 然後按重新整理 ，現在重新整理後，又會跑回189，
    console.log(isLocatingUser)
    // 74==>yourlocation25.0223446,121.4994686==>setUserPosition(data1)==>181;
    if (dragposi) {
      console.log('getdragPosition in useEffect' + dragposi);
      getdragPosition(dragposi);
    }
  }, [dragposi]);

  //========20221114 update
  // useEffect(() => {
  //   //這邊要預防，onload => drap， 然後按重新整理 ，現在重新整理後，又會跑回189，
  //   console.log("reflash"+userPosition)
  // }, [userPosition]);

  useEffect(() => {
    console.log(isFindingBikes)
  }, [isFindingBikes])

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
    if (getdata.length == 0) return;

    return getdata.map((station, index) => {
      // const bikeversion = station.stationName.includes("2.0") ? "plus" : ""
      const updateTime = /.*T(\d*:\d*)/g.exec(station.srcUpdateTime)[1];
      return (
        <Marker key={index}
          icon={isFindingBikes ? availabilityNum(station.availableRentBikes) : availabilityNum(station.availableReturnBikes)}
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
                <div className="popup_parks">
                  <img src={parkingGreySvg} alt="bicycle icon" />
                  <span className="quantity typography-bold typography-button">{station.availableReturnBikes}</span>
                </div>
                <span className="update_time typography-medium typography-caption">{updateTime}更新</span>
              </div>
            </div>
          </Popup>

          <Tooltip direction="center" offset={[0, -2]} opacity={1} permanent>
            {isFindingBikes ? (station.availableRentBikes) : (station.availableReturnBikes)}
          </Tooltip>

        </Marker>
      );
    });
  }

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

  //   //   //   //   //   //   //   // 


  return (
    <>
      {isLocatingUser ? locatingMessage : null}

      {userPosition ?
        <MapContainer
          center={userPosition}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: "100vh" }}
        >
          <ChangeCenter
            center={userPosition}
          />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* drag map */}
          <MyComponent />

          {/* bikemarker */}
          <MultipleMarkers />

          <div className="find_type_wrapper">
            <label htmlFor="find_bikes">
              <input
                type="radio"
                name="find_type"
                id="find_bikes"
                checked={isFindingBikes}
                onChange={() => {
                  return;
                }}
                hidden
              />
              <button
                className="find_type typography-bold typography-button"
                onClick={handleFindingType}
              >
                <div className="find_type_img">
                  {isFindingBikes ? (
                    <img src={bicycleWhiteSvg} alt="bicycle white icon" />
                  ) : (
                    <img src={bicycleSvg} alt="bicycle white icon" />
                  )}
                </div>
                找單車
              </button>
            </label>
            <label htmlFor="find_parks">
              <input
                type="radio"
                name="find_type"
                id="find_parks"
                checked={!isFindingBikes}
                onChange={() => {
                  return;
                }}
                hidden
              />
              <button
                className="find_type typography-bold typography-button"
                onClick={handleFindingType}
              >
                <div className="find_type_img">
                  {isFindingBikes ? (
                    <img src={parkingSvg} alt="parking icon" />
                  ) : (
                    <img src={parkingWhiteSvg} alt="parking icon" />
                  )}
                </div>
                找車位
              </button>
            </label>
          </div>
          {getLocationButton}
        </MapContainer>
        : null
      }

    </>
  )

}