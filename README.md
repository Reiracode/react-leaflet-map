
# Taiwan Ubike Map 

This project is a Taiwan Ubike map web application developed using React and Leaflet. It provides users with real-time information on the location and availability of ubike stations across Taiwan.

提供使用者以即時定位，快速找到附近的Ubike站點位置及可用車位/可用車輛，並可透過拖曳地圖的方式，顯示範圍內的站點密度和分佈情況。
顯示台灣所有Ubike站點的位置。

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
 
 
## Demo

Check out the [live demo](https://reiracode.github.io/react-leaflet-map/)!

 

## 功能與特色

- 查詢站點：使用者可以輸入關鍵字或點選地圖上的地區來查詢該地區的Ubike站點資訊。
- 地圖視覺化：地圖上的Ubike站點會用標記呈現，並隨著使用者移動地圖而重新渲染。
- 站點詳細資訊：使用者點選地圖上的Ubike站點標記，會出現該站點的詳細資訊，包括可借車輛數量、可還車位數量等資訊。
- 路線規劃：使用者可以在地圖上點選起點和終點來規劃自行車路線，並可選擇步行/自行車/開車模式。

## Demo

![Demo GIF](https://i.imgur.com/8RPlHHy.gif)
