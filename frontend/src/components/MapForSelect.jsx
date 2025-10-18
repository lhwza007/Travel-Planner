import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import { IoMdPin } from "react-icons/io";
import axios from "axios";

// onSelectPlace คือ props ในแบบฟังก์ชั่นจาก MapModal ที่รับค่าจาก component นี้ไปยัง MapModal component
export default function ShowMapForSelect ({ park_id, onSelectPlace }) {
  const [openMarkerId, setOpenMarkerId] = useState(null);
  const [parkPlaces, setParkPlaces] = useState(null);
  const [parkPlacesCenter, setParkPlacesCenter] = useState(null);

  useEffect(() => {
    if (park_id) fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/getData/parkPlaces",
        { params: { park_id } }
      );

      setParkPlaces(response.data);

      if (response.data.length > 0) {
        let center = response.data[0].parkplaces_center;
        if (typeof center === "string") center = JSON.parse(center);
        setParkPlacesCenter(center);
      }
    } catch (error) {
      console.error("Error fetching park places data:", error);
    }
  };

  if (!parkPlaces || !parkPlacesCenter)
    return <div>Map is unavailable now...</div>;

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "600px", width: "100%" }}>
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultCenter={parkPlacesCenter}
          defaultZoom={10}
          mapTypeId="satellite"
          gestureHandling="greedy"
        >
          {parkPlaces.map((parkPlace) => (
            <div key={parkPlace.parkplace_id}>
              <AdvancedMarker
                position={{
                  lat: parseFloat(parkPlace.parkplace_lat),
                  lng: parseFloat(parkPlace.parkplace_lng),
                }}
                onClick={() => {
                  setOpenMarkerId(
                    openMarkerId === parkPlace.parkplace_id
                      ? null
                      : parkPlace.parkplace_id
                  );

                  if (onSelectPlace) {
                    onSelectPlace(parkPlace);
                    console.log("Selected place:", parkPlace);
                  }
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <IoMdPin
                    style={{
                      color: "#da0000ff",
                      width: "40px",
                      height: "40px",
                      marginBottom: "5px",
                    }}
                  />
                  <br />
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#ffffffff",
                      backgroundColor: "#00000080",
                      borderRadius: "4px",
                      padding: "2px 4px",
                      display: "inline-block",
                      marginTop: "-8px",
                    }}
                  >
                    {parkPlace.parkplace_name}
                  </div>
                </div>
              </AdvancedMarker>

              {openMarkerId === parkPlace.parkplace_id && (
                <InfoWindow
                  position={{
                    lat: parseFloat(parkPlace.parkplace_lat),
                    lng: parseFloat(parkPlace.parkplace_lng),
                  }}
                  onCloseClick={() => setOpenMarkerId(null)}
                >
                  <div style={{ minWidth: "150px" }}>
                    <h3 style={{ margin: "0 0 4px" }}>
                      {parkPlace.parkplace_name}
                    </h3>
                    <p style={{ margin: 0, fontSize: "13px" }}>
                      {parkPlace.parkplace_description}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </div>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
