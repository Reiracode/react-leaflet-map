
# Taiwan Ubike Map 

This project is a Taiwan Ubike map web application developed using React and Leaflet. It provides users with real-time information on the location and availability of ubike stations across Taiwan.

提供使用者以即時定位，快速找到附近的Ubike站點位置及可用車位/可用車輛，並可透過拖曳地圖的方式，顯示範圍內的站點密度和分佈情況。

## Features
- Interactive map with real-time information on ubike station location and availability.
- Display locations of all Ubike stations in Taiwan
- View detailed information of each station including available bikes and parking spaces
- RWD design for users to use the application on mobile devices.

## 使用技術

- React.js：主要的前端框架，用於構建用戶界面和控制應用邏輯。
- Leaflet.js：用於顯示地圖和Ubike站點位置。
- React-Leaflet：用於將React和Leaflet進行整合，方便開發React.js應用中的地圖功能。
- leaflet.markercluster：用於將Ubike站點按地理位置聚集顯示，方便查看站點密度和分佈情況。
- react-infinite-scroll-component：用於實現無限滾動載入Ubike站點資訊，提高用戶體驗。
- React Geolocated 
- Axios：用於對Ubike API進行請求，獲取Ubike站點資訊。
- Material-UI：React UI元件庫，用於提供基礎的UI元件和樣式。


## 使用說明

使用非常簡單，開啟定位後，瀏覽地圖，可點擊任意Ubike站點icon，即會顯示站點的詳細資訊，包括站點名稱、剩餘車輛數量、可停車位數量等等。
 
 
## Demo

Check out the [live demo](https://reiracode.github.io/react-leaflet-map/)!

 
