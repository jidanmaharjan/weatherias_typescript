//Map import
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Map = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between font-semibold mb-4">
        <h2 className="text-lg font-bold">Global Map</h2>
      </div>

      <div className=" max-h-80 mb-4 z-5">
        <MapContainer>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
