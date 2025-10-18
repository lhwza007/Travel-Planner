// import {
//   APIProvider,
//   Map,
//   useMap,
//   useMapsLibrary,
// } from "@vis.gl/react-google-maps";
// import { useEffect, useState } from "react";

// const points = [
//   { lat: 13.736717, lng: 100.523186 }, // กรุงเทพฯ
//   { lat: 13.7563, lng: 100.5018 }, // จุด 2
//   { lat: 14.0208, lng: 100.525 }, // จุด 3
//   { lat: 14.8, lng: 100.65 }, // จุด 4
//   { lat: 16.757657478823624, lng: 100.20579799075364 }, // จุด 5 (ปลายทาง) 16.757657478823624, 100.20579799075364
// ];

// function Directions() {
//   const map = useMap();
//   const routesLib = useMapsLibrary("routes");
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);

//   useEffect(() => {
//     if (!routesLib || !map) return;

//     const renderer = new routesLib.DirectionsRenderer({ map });
//     setDirectionsRenderer(renderer);

//     const service = new routesLib.DirectionsService();

//     const waypoints = points.slice(1, points.length - 1).map((p) => ({
//       location: p,
//       stopover: true,
//     }));

//     service
//       .route({
//         origin: points[0],
//         destination: points[points.length - 1],
//         waypoints,
//         optimizeWaypoints: true,
//         travelMode: google.maps.TravelMode.DRIVING,
//       })
//       .then((res) => {
//         renderer.setDirections(res);
//       })
//       .catch((err) => console.error("Error calculating route:", err));

//     return () => renderer.setMap(null);
//   }, [routesLib, map]);

//   return null;
// }

// export default function MultiRouteMap() {
//   return (
//     <>
//       <div style={{ marginBottom: "20px", borderRadius: "10px", overflow: "hidden" }}>
//         <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//           <div style={{ height: "500px", width: "100%" }}>
//             <Map
//               defaultZoom={10}
//               defaultCenter={{ lat: 14.0, lng: 100.6 }}
//               mapTypeId="satellite"
//               gestureHandling="greedy"
//               disableDefaultUI={false}
//             >
//               <Directions />
//             </Map>
//           </div>
//         </APIProvider>
//       </div>
//     </>
//   );
// }

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import { IoMdPin } from "react-icons/io";
import axios from "axios";

//🔹 ข้อมูลหลายจุดบนแผนที่
// const locations = [
//   {
//     id: 1,
//     name: "จุดชมวิวทิวทัศน์",
//     position: { lat: 18.87288221982771, lng: 98.78169479949723 }, // 18.87288221982771, 98.78169479949723
//     description: "จุดชมวิวทิวทัศน์ ป่าเสมิง",
//   },
//   {
//     id: 2,
//     name: "บ่อน้ำอุ่นธรรมชาติ",
//     position: { lat: 18.85501520124959, lng: 98.62178713069818 }, // 18.85501520124959, 98.62178713069818
//     description: "บ่อน้ำอุ่นธรรมชาติ",
//   },
//   {
//     id: 3,
//     name: "ถ้ำหลวงแม่สาบ",
//     position: { lat: 18.864570150228364, lng: 98.71326624914754 }, // 18.864570150228364, 98.71326624914754
//     description: "ถ้ำหลวงแม่สาบ",
//   },
// ];

export default function ShowMap({ park_id }) {
  const [openMarkerId, setOpenMarkerId] = useState(null);
  const [parkPlaces, setParkPlaces] = useState(null);
  const [parkPlacesCenter, setParkPlacesCenter] = useState(null);

  useEffect(() => {
    if (park_id) {
      fetchData();
    }
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
        if (typeof center === "string") {
          center = JSON.parse(center);
        }
        setParkPlacesCenter(center);
      }
    } catch (error) {
      console.error("Error fetching park places data:", error);
    }
  };

  // console.log("park places:", parkPlaces);
  // console.log("park places center:", parkPlacesCenter.lat);

  if (!parkPlaces || !parkPlacesCenter) {
    return <div>Map is unavailable now...</div>;
  } else {
    return (
      <>
        <div
          style={{
            marginBottom: "20px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
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
                    {/* หมุด */}
                    <AdvancedMarker
                      position={{
                        lat: parseFloat(parkPlace.parkplace_lat),
                        lng: parseFloat(parkPlace.parkplace_lng),
                      }}
                      onClick={() =>
                        setOpenMarkerId(
                          openMarkerId === parkPlace.parkplace_id
                            ? null
                            : parkPlace.parkplace_id
                        )
                      }
                    >
                      {/* รูปหมุด */}
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

                    {/* Info Window */}
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
        </div>
      </>
    );
  }
}
