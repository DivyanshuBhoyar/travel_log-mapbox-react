import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./api";

import LogEntryForm from "./LogEntryForm";
import "./App.css";
import MyIcon from "./marker.svg?component";
import markernew from "./markernew.png";

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 5,
  });

  function handleDbClick(e) {
    const [longitude, latitude] = e.lngLat;
    console.log(longitude, latitude);
    setAddEntryLocation({
      latitude,
      longitude,
    });
  }

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };
  useEffect(() => {
    getEntries();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={handleDbClick}
    >
      {logEntries.map((entry) => (
        <React.Fragment key = {entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-12}
            offsetTop={-24}
            key={entry._id}
          >
            <div onClick={() => setShowPopup({ [entry._id]: true })}>
              <MyIcon style={{ color: "yellow" }} />
            </div>
            <div>{entry.title}</div>
          </Marker>
          {showPopup[entry._id] && (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <h6>
                  Visited on {new Date(entry.visitDate).toLocaleDateString()}
                </h6>
                {entry.image && <img src = {entry.image}  alt = "image entry" />}
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
      {addEntryLocation && (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <img
              src={markernew}
              alt="marker icon"
              style={{ width: "40px", height: "auto" }}
            />
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      )}
    </ReactMapGL>
  );
}

export default App;
