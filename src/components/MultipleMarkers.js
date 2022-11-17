import { Marker, Popup, Tooltip } from "react-leaflet";
import availabilityNum from "../utils/availabilityNum";
import bicycleGreySvg from "../assets/icon-bicycle-grey.svg";
import parkingGreySvg from "../assets/icon-parking-grey.svg";

const MultipleMarkers = ({ getdata, isFindingBikes }) => {
  if (getdata.length == 0) return;

  return getdata.map((station, index) => {
    // const bikeversion = station.stationName.includes("2.0") ? "plus" : ""
    const updateTime = /.*T(\d*:\d*)/g.exec(station.srcUpdateTime)[1];
    return (
      <Marker key={index}
        icon={availabilityNum(isFindingBikes ?station.availableRentBikes  : station.availableReturnBikes)}
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
          {/* {isFindingBikes ? (station.availableRentBikes) : (station.availableReturnBikes)} */}
          {isFindingBikes ? <span className="test1">{station.availableRentBikes}</span> : <span className="test2">{station.availableReturnBikes}</span>}
        </Tooltip>

      </Marker>
    );
  });
}

export default MultipleMarkers;