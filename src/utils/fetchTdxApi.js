// import jsSHA from "jssha/dist/sha1";
// https://tdx.transportdata.tw/api-service/swagger#/Bike%20Advanced(Nearby)/BikeApi_Station_AllCity_NearBy_2870

export async function getAvailableBikes(userPosition) {
  if (userPosition.length == 0){
    console.log("0")
    return;
  }

  //前後端的関係：如果api 後端没有處理好，advanced的功能就會在前端，json資料的比對，計算距離
  //口罩地圖和ubike的不同。
  //不用token的話：放上github 就用basic 搭配indexOf > -1
  try {
    const [lat, lng] = userPosition;
    // const stationUrl = `https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/Taipei?&%24format=JSON`;
    // const bikeUrl = `https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/Taipei?%24format=JSON`;
    // const stationUrl = `https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/Taipei?%24top=30&%24spatialFilter=nearby(${lat},${lng},1000)&%24format=JSON`;
    // const bikeUrl = `https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/Taipei?%24format=JSON`;

    const stationUrl = `https://tdx.transportdata.tw/api/advanced/v2/Bike/Station/NearBy?%24top=30&%24spatialFilter=nearby(${lat},${lng},1000)&%24format=JSON`;
    const bikeUrl = `https://tdx.transportdata.tw/api/advanced/v2/Bike/Availability/NearBy?%24top=30&%24spatialFilter=nearby(${lat},${lng},1000)&%24format=JSON`;

    const data = await Promise.allSettled([
      fetchTdxApi(stationUrl),
      fetchTdxApi(bikeUrl),
    ]);

    const result = [];
    const [stationData, bikeData] = [data[0].value, data[1].value];
    // console.log(stationData)
    // console.log(bikeData)

    
    const stationIndex = stationData.map(item => item.StationUID);
    const bikeDetail = bikeData.filter((item) => stationIndex.indexOf(item.StationUID) > -1)
    // console.log(bikeDetail)

    ////////////////////
    for (let i = 0; i < stationData.length; i++) {
      let stationStatus = {
        stationId: stationData[i].StationUID,
        stationName: stationData[i].StationName.Zh_tw,
        stationAddress: stationData[i].StationAddress.Zh_tw,
        stationPosition: {
          lat: stationData[i].StationPosition.PositionLat,
          lng: stationData[i].StationPosition.PositionLon,
        },
        serviceStatus: bikeDetail[i].ServiceStatus,
        availableRentBikes: bikeDetail[i].AvailableRentBikes,
        availableReturnBikes: bikeDetail[i].AvailableReturnBikes,
        srcUpdateTime: bikeDetail[i].SrcUpdateTime,
      };
      result.push(stationStatus);
    }
    // console.log(result) ;
    return result;


  } catch (error) {
    throw error;
  }
}

export default async function fetchTdxApi(url) {
  const tokenCode = await getToken();
  try {

    //TOKEN
    const response = await fetch(url, { headers: { authorization: `Bearer ${tokenCode.access_token}` } });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }


  // let response = await fetch(url, { headers: { authorization: `Bearer ${tokenCode.access_token}` } });
  // const data = await response.json();
  // return data;

}

async function getToken() {
  const parameter = {
    grant_type: "client_credentials",
    client_id: process.env.REACT_APP_API_ID,
    client_secret: process.env.REACT_APP_API_KEY
  };
  let auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
  const queryString = new URLSearchParams(parameter).toString();

  let response = await fetch(auth_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: (queryString)
  });

  // you can check for response.ok here, and literally just throw an error if you want
  return await response.json();
}
