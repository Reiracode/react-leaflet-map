import React, { useState } from "react";
import { MapContainer, TileLayer  } from "react-leaflet";
import { ChangeCenter } from "./ChangeCenter";
import GetLocationButton from "./GetLocationButton";
import FindTypeButton from "./FindTypeButton";
import MultipleMarkers from "./MultipleMarkers";


export default function MapChild({ userPosition, getdata, DragMap, getPosition, isLocatingUser }) {
  //  //找單車/車位
  const [isFindingBikes, setIsFindingBikes] = useState(true);
  function handleFindingType() {
    // setIsFindingBikes((bool) => !bool);
    setIsFindingBikes(!isFindingBikes);
  }

  return (
    <main>
      {userPosition ?
        <MapContainer
          center={userPosition}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: "calc(100vh - 40px)" }}
        >
          <ChangeCenter
            center={userPosition}
          />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <DragMap />

          {/* bikemarker */}
          <MultipleMarkers getdata={getdata} isFindingBikes={isFindingBikes} />

          <FindTypeButton  
            isFindingBikes={isFindingBikes}
            handleFindingType={handleFindingType}
          />

          <GetLocationButton
            onMoveTo={getPosition}
            isLocatingUser={isLocatingUser}
          />

        </MapContainer>
        : null
      }

    </main>
  )

}