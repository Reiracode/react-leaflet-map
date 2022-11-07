import { useState } from "react";
import MapArea from "./components/MapArea";
import CountryButtons from "./components/CountryButtons";
import "./styles.css";

// export default function App() {
//   const [coordinate, setCoordinate] = useState({
//     latitude: 35.6803997,
//     longitude: 139.7690174,
//     capital: "Tokyo"
//   }); 
//   return (
//     <div className="App">
//       <MapArea coordinate={coordinate} />
//       <CountryButtons setCoordinate={setCoordinate} />
//     </div>
//   );
// }

import React from "react";
import Header from "./layout/header";
import Main from "./layout/main";

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
