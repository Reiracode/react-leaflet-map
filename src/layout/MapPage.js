import React, { useState, useCallback, useEffect } from "react";
import { Icon } from 'leaflet';
import { useMapEvents, Marker, Popup } from "react-leaflet";
import asyncGetGeolocation from "../utils/getGeolocation";
import { getAvailableBikes } from "../utils/fetchTdxApi";
import MapChild from "../components/MapChild";
import marker from '../assets/icon-user-position-mobile.svg';
import "leaflet/dist/leaflet.css";
import "../index.css";
import "../layout/main.css"

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [32, 32]
})


export default function MapPage() {
  // ---------way1
  const [userPosition, setUserPosition] = useState(null);
  const [dragposi, setDragposi] = useState(null);
  //bikes
  const [getdata, setGetdata] = useState([]);
  const [isLocatingUser, setIsLocatingUser] = useState(true);
  const locatingMessage = (
    <div className="overlay">
      <div className="loader"></div> 
      {/* <span className="typography-bold typography-h4">定位中...</span> */}
    </div>
  );

  //可複用 取得現在位子，並以此取得bikes data
  const getPosition = useCallback(async () => {
    const urlocation = await asyncGetGeolocation();
    console.log("--------yourlocation" + urlocation)
    setUserPosition(urlocation);
 
    const bikes = await getAvailableBikes(urlocation);
    setGetdata(bikes);
    setIsLocatingUser(false);
  }, [])

  //get dragPosition ==> then get bikes
  async function getdragPosition() {
    if (dragposi === null) {
      return
    } else {
      const bikes = await getAvailableBikes(dragposi);
      setGetdata(bikes);
      console.log(bikes);
    }
  }

  // dragend 取得position  更新位子到 dragposi/userPosition
  function DragMap() {
    const map = useMapEvents({
      dragend: (e) => {
        console.log("mapCenter", e.target.getCenter());
        const newposition = e.target.getCenter();
        const data1 = [newposition.lat, newposition.lng]
        setDragposi(data1);
        setUserPosition(data1);
      }
    });
    return (
        <Marker position={userPosition} icon={myIcon}>
          <Popup>You are here</Popup>
        </Marker>
    )
  }

  //loading時，就取得現在位子
  useEffect(() => {
    getPosition()
    console.log('getPosition in useEffect');
  }, [getPosition]);

  //loading不用，當drap時才需要用 getPosition()
  useEffect(() => {
    if (dragposi) {
      console.log('getdragPosition in useEffect' + dragposi);
      getdragPosition(dragposi);
    }
  }, [dragposi]);


  return (
    <main>
      {/* {locatingMessage} */}
      {isLocatingUser ? locatingMessage : null}
      {userPosition ?
        <MapChild
          userPosition={userPosition}
          getdata={getdata}
          DragMap={DragMap}
          getPosition={getPosition}
          isLocatingUser={isLocatingUser}
        /> 
        : null
      }

    </main>
  )

}