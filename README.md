
# Taiwan Ubike Map 

This project is a Taiwan Ubike map web application developed using React and Leaflet. It provides users with real-time information on the location and availability of ubike stations across Taiwan.

## Features

- Interactive map with real-time information on ubike station location and availability.
- Filter function to filter ubike stations by availability and distance.
- Mobile responsive design for users to use the application on mobile devices.
- Display locations of all Ubike stations in Taiwan
- View detailed information of each station including available bikes and parking spaces
- Responsive design optimized for mobile devices

## Technologies Used

- React
- Leaflet
- Redux
- Axios
- Material-UI
- React-Router

## Project Structure

- `public/`: Contains the HTML file and assets.
- `src/actions/`: Contains Redux actions for fetching ubike data.
- `src/components/`: Contains React components for the application.
- `src/constants/`: Contains constants used in the application.
- `src/reducers/`: Contains Redux reducers for updating the state.
- `src/routes/`: Contains the routes used in the application.
- `src/store/`: Contains the Redux store configuration.
- `src/utils/`: Contains utility functions used in the application.

## 開發目的

此網站的開發目的是提供使用者一個方便快速找到臺北市Ubike站點位置及相關資訊的工具，透過網站上的地圖，使用者可以方便地查找附近的Ubike站點，並瞭解該站點的詳細資訊。

## 使用技術

此網站使用了以下技術：

- React.js：主要的前端框架，用於構建用戶界面和控制應用邏輯。
- Leaflet.js：開源地圖庫，用於顯示地圖和Ubike站點位置。
- React-Leaflet：用於將React和Leaflet進行整合，方便開發React.js應用中的地圖功能。
- Axios：用於對Ubike API進行請求，獲取Ubike站點資訊。
- Material-UI：React UI元件庫，用於提供基礎的UI元件和樣式。

## Plugins and Libraries

此網站使用了以下插件和庫：

- leaflet.markercluster：用於將Ubike站點按地理位置聚集顯示，方便用戶查看站點密度和分佈情況。
- react-infinite-scroll-component：用於實現無限滾動載入Ubike站點資訊，提高用戶體驗。

總體來說，這個找Ubike的網站使用了現代化的前端技術，並整合了多個庫和插件，提供了方便快捷的Ubike站點查詢功能，可以為臺北市Ubike騎士提供良好的用戶體驗。
## Demo

你可以點擊以下鏈接查看網站Demo：

- https://reiracode.github.io/react-leaflet-map/

## 使用說明

此網站使用非常簡單，只需要在地圖上瀏覽即可。點擊任意Ubike站點圖標，會出現該站點的詳細資訊，包括站點名稱、剩餘車輛數量、可停車位數量等等。

網站頂部的搜索欄位可以用於搜索指定位置附近的Ubike站點。你可以在搜索欄位輸入任意位置，然後按下Enter鍵，網站會自動顯示該位置附近的Ubike站點。在搜索結果中點擊任意站點，可以查看該站點的詳細資訊。




## Plugins and Libraries

- React Leaflet: A React library for Leaflet maps.
- Leaflet.markercluster: A Leaflet plugin for clustering markers.
- Leaflet Control Search: A Leaflet plugin for searching markers by attribute.
- React Geolocated: A React library for geolocation.

## Usage

1. Clone the repository: `git clone https://github.com/reiracode/react-leaflet-map.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open the application in a web browser: `http://localhost:3000/`

## Demo

Check out the [live demo](https://reiracode.github.io/react-leaflet-map/)!


## Conclusion

This project showcases my frontend development skills in building an interactive and responsive web application using React and Leaflet. With the use of plugins and libraries, the application is able to provide real-time information on ubike stations across Taiwan, as well as search and filter functions for users to find the nearest and most available ubike stations.
