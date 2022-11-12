import "./main.css";
import { useState, useEffect, useCallback } from "react";
import asyncGetGeolocation from "../utils/getGeolocation";
import { getAvailableBikes } from "../utils/fetchTdxApi";
import BikeMap from "../components/bikeMap";
// import BikeMap from "../components/bikeMap3";

function Main() {



  function handleFindingType() {
    setIsFindingBikes((bool) => !bool);
  }

  const TAIPEI_COORDINATES = [35.4122, 139.4130];
  const [userPosition, setUserPosition] = useState(TAIPEI_COORDINATES);
  // const [userPosition, setUserPosition] = useState(false);

  const [bikesAvailable, setBikesAvailable] = useState([]);
  // const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(true);
  const [isFindingBikes, setIsFindingBikes] = useState(true);
 
  ///方式1   OK   try catch ////////////
  // const getLocation = async () => {
  //   try {
  //     const userCoordinates = await asyncGetGeolocation();
  //     console.log("default定位成功" + userCoordinates)
  //     setUserPosition(userCoordinates);
  //     const bikes = await getAvailableBikes(userCoordinates);
  //     console.log(bikes)
  //     setBikesAvailable(bikes);
  //     setIsLocatingUser(false);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);


  // 方式3 -------  用 useCallback 並將回傳的函式取名為 fetchData
  // const fetchData = useCallback(() => {
  // //   // STEP 3：把原本的 fetchData 改名為 fetchingData 放到 useCallback 的函式內
  //   const fetchingData = async () => {
  //     const data1 = await asyncGetGeolocation();
  //     setUserPosition(data1);
  //     const bikes = await getAvailableBikes(data1);
  //     setBikesAvailable(bikes);
  //     setIsLocatingUser(false);
  //   };
  //   fetchingData();
  // }, []);

  // useEffect(() => {
  //   console.log('execute function in useEffect');
  //   fetchData();
  //   // STEP 6：把透過 useCallback 回傳的函式放到 useEffect 的 dependencies 中
  // }, [fetchData]);


  //  方式4  -------   OK callback //   //   //   //
  // async function getPosts() {
  //   const data = await asyncGetGeolocation();
  //   console.log(data);
  //   return data;
  // }

  const getPosition = useCallback(async () => {
    const data = await asyncGetGeolocation();
    console.log("yourlocation" + data)
    setUserPosition(data);

    const bikes = await getAvailableBikes(data);
    setBikesAvailable(bikes);
    setIsLocatingUser(false);
  }, [])

  useEffect(() => {
    console.log('execute getPosition in useEffect');
    getPosition()
  }, [getPosition]);

 
    //   //   //   //   //   //   //   // 
  const locatingMessage = (
    <div className="overlay">
      <span className="typography-bold typography-h4">定位中</span>
    </div>
  );

  return (
    <main>
      {/* {locatingMessage} */}
      {isLocatingUser ? locatingMessage : null}
      {userPosition &&
        <BikeMap
          userPosition={userPosition}
          bikesAvailable={bikesAvailable}
          isFindingBikes={isFindingBikes}
          handleLocateUser={getPosition}
          isLocatingUser={isLocatingUser}
          handleFindingType={handleFindingType}
        />
      }
  
 
    </main>
  );
}

export default Main;
