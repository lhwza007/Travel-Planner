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
import { useState } from "react";
import { IoMdPin } from "react-icons/io";

const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // 👈 ใช้แบบ Vite

// 🔹 ข้อมูลหลายจุดบนแผนที่
const locations = [
  {
    id: 1,
    name: "จุดชมวิวทิวทัศน์",
    position: { lat: 18.87288221982771, lng: 98.78169479949723 }, // 18.87288221982771, 98.78169479949723
    description: "จุดชมวิวทิวทัศน์ ป่าเสมิง",
  },
  {
    id: 2,
    name: "บ่อน้ำอุ่นธรรมชาติ",
    position: { lat: 18.85501520124959, lng: 98.62178713069818 }, // 18.85501520124959, 98.62178713069818
    description: "บ่อน้ำอุ่นธรรมชาติ",
  },
  {
    id: 3,
    name: "ถ้ำหลวงแม่สาบ",
    position: { lat: 18.864570150228364, lng: 98.71326624914754 }, // 18.864570150228364, 98.71326624914754
    description: "ถ้ำหลวงแม่สาบ",
  },
];

export default function ShowMap() {
  const [openMarkerId, setOpenMarkerId] = useState(null);

  return (
    <>
      <div
        style={{
          marginBottom: "20px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <APIProvider apiKey={MAP_API_KEY}>
          <div style={{ height: "600px", width: "100%" }}>
            <Map
              mapId={import.meta.env.VITE_MAP_ID}
              defaultCenter={{
                lat: 18.864570150228364,
                lng: 98.71326624914754,
              }}
              defaultZoom={12}
              mapTypeId="satellite"
              gestureHandling="greedy"
            >
              {locations.map((loc) => (
                <div key={loc.id}>
                  {/* หมุด */}
                  <AdvancedMarker
                    position={loc.position}
                    onClick={() =>
                      setOpenMarkerId(openMarkerId === loc.id ? null : loc.id)
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
                        {loc.name}
                      </div>
                    </div>
                  </AdvancedMarker>

                  {/* Info Window */}
                  {openMarkerId === loc.id && (
                    <InfoWindow
                      position={loc.position}
                      onCloseClick={() => setOpenMarkerId(null)}
                    >
                      <div style={{ minWidth: "150px" }}>
                        <h3 style={{ margin: "0 0 4px" }}>{loc.name}</h3>
                        <p style={{ margin: 0, fontSize: "13px" }}>
                          {loc.description}
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
