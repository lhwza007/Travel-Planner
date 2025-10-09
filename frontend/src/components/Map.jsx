import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const points = [
  { lat: 13.736717, lng: 100.523186 }, // กรุงเทพฯ
  { lat: 13.7563, lng: 100.5018 }, // จุด 2
  { lat: 14.0208, lng: 100.525 }, // จุด 3
  { lat: 14.8, lng: 100.65 }, // จุด 4
  { lat: 16.757657478823624, lng: 100.20579799075364 }, // จุด 5 (ปลายทาง) 16.757657478823624, 100.20579799075364
];

function Directions() {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    if (!routesLib || !map) return;

    const renderer = new routesLib.DirectionsRenderer({ map });
    setDirectionsRenderer(renderer);

    const service = new routesLib.DirectionsService();

    const waypoints = points.slice(1, points.length - 1).map((p) => ({
      location: p,
      stopover: true,
    }));

    service
      .route({
        origin: points[0],
        destination: points[points.length - 1],
        waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res) => {
        renderer.setDirections(res);
      })
      .catch((err) => console.error("Error calculating route:", err));

    return () => renderer.setMap(null);
  }, [routesLib, map]);

  return null;
}

export default function MultiRouteMap() {
  return (
    <>
      <div style={{ marginBottom: "20px", borderRadius: "10px", overflow: "hidden" }}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <div style={{ height: "500px", width: "100%" }}>
            <Map
              defaultZoom={10}
              defaultCenter={{ lat: 14.0, lng: 100.6 }}
              mapTypeId="satellite"
              gestureHandling="greedy"
              disableDefaultUI={false}
            >
              <Directions />
            </Map>
          </div>
        </APIProvider>
      </div>
    </>
  );
}
