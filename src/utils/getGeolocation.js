// const asyncGetGeolocation = (
//   options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
// ) => {
//   return new Promise((resolve, reject) => {
//     function onResolve(data) {
//       resolve([data.coords.latitude, data.coords.longitude]);
//     }
//     function onReject(error) {
//       reject(error);
//     }
//     navigator.geolocation.getCurrentPosition(onResolve, onReject, options);
//   });
// };

const asyncGetGeolocation = () => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      const position = (position) => {
        resolve([position.coords.latitude, position.coords.longitude]);
      };
      const showError = (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("讀取不到您目前的位置");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("讀取不到您目前的位置");
            break;
          case error.TIMEOUT:
            alert("讀取位置逾時");
            break;
          case error.UNKNOWN_ERROR:
            alert("Error");
            break;
        }
        resolve([35.4122, 139.4130]);
      };
      navigator.geolocation.getCurrentPosition(position, showError);
    }
  });
};

export default asyncGetGeolocation;
