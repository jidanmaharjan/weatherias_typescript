import { useState } from "react";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";

//Api imports
import { getRealtimeWeather } from "../api/getRealtimeWeather";

//Component imports
import Botnav from "../components/Botnav";
import Dashboard from "../components/Dashboard";
import Infobar from "../components/Infobar";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import Savedlocation from "../components/Savedlocation";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [side, setSide] = useState(true);
  const realtimeWeather = useQuery("realtime-weather", getRealtimeWeather, {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col">
      <Sidebar side={side} />
      <Botnav />
      <div
        className={`flex-grow ${
          side && "md:pl-60"
        } transition-all duration-200 ease-in-out md:pr-80`}
      >
        <Navbar side={side} setSide={setSide} />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard realtimeWeather={realtimeWeather && realtimeWeather} />
            }
          />
          <Route path="map" element={<Map />} />
          <Route path="savedlocation" element={<Savedlocation />} />
        </Routes>
      </div>
      <Infobar realtimeWeather={realtimeWeather && realtimeWeather} />
    </div>
  );
};

export default Home;
