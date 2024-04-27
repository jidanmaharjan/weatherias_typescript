import React, { useEffect, useState } from "react";

//icon imports
import { BsFillBookmarkStarFill, BsFillBookmarkXFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { useQuery } from "react-query";
import { getRealtimeWeather } from "../api/getRealtimeWeather";

const Savedlocation = () => {
  const {refetch} = useQuery('realtime-weather', getRealtimeWeather,
  {
    refetchOnWindowFocus: false,
    enabled: false,
  })

  const [allSaves, setAllSaves] = useState(
    JSON.parse(localStorage.getItem("savedLocations")) || []
  );
  const [activeLocation, setActiveLocation] = useState(
    localStorage.getItem("activeLocation") || "London"
  );

  const checkActiveLocation = (city) => {
    if (city === activeLocation) {
      return true;
    } else {
      return false;
    }
  };

  const removeLocation =(city) => {
    const newAll = allSaves.filter(each=>each.city !== city)
    if(city === activeLocation) {
      setActiveLocation(newAll[0].city)
      localStorage.setItem('activeLocation', newAll[0].city)
      refetch()
    }
    setAllSaves(newAll)
    localStorage.setItem('savedLocations', JSON.stringify(newAll))
  }

  return (
    <div className="p-4 pt-0">
      <div className="flex items-center justify-between font-semibold z-10 py-4 sticky top-20 bg-white">
        <h2 className="text-lg font-bold">Saved Location</h2>
        <button onClick={()=>setAllSaves(JSON.parse(localStorage.getItem("savedLocations") || []))} className="flex items-center bg-sky-400 hover:bg-sky-500 py-2 px-4 text-gray-100 rounded-md"><MdRefresh className="mr-2 text-xl" />Refresh</button>
      </div>
      <div className="grid gap-4">
        {allSaves &&
          allSaves.length > 0 &&
          allSaves.map((location) => (
            <div
              key={location.city}
              className="flex items-center justify-between bg-white rounded-md py-2 px-4 border border-gray-200 hover:border-sky-400"
            >
              <div className="font-semibold">
                <h2 className="">{location.city}</h2>
                <p className="text-sm text-gray-400">{location.country}</p>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  disabled={checkActiveLocation(location.city) ? true : false}
                  className="flex items-center py-2 px-4 text-gray-100 rounded-md gap-2 bg-sky-400 hover:bg-sky-500 disabled:bg-sky-300"
                  onClick={() => {
                    setActiveLocation(location.city);
                    localStorage.setItem("activeLocation", location.city);
                    refetch()
                  }}
                >
                  <AiFillStar /> Active
                </button>
                <button className="flex items-center py-2 px-4 text-gray-100 rounded-md gap-2 bg-red-400 hover:bg-red-500" onClick={()=>removeLocation(location.city)}>
                  <BsFillBookmarkXFill /> Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Savedlocation;
