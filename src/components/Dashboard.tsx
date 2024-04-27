import { Link } from "react-router-dom";

//Icons import
import { AiOutlineCompass } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaRadiationAlt } from "react-icons/fa";
import { MdWaves } from "react-icons/md";
import { RiTempColdFill } from "react-icons/ri";
import {
  TiWeatherShower,
  TiWeatherSunny,
  TiWeatherWindy,
} from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";

//Component imports
import { ClockLoader } from "react-spinners";
import Linechart from "./Linechart";
import { UseQueryResult } from "react-query";

const Dashboard = ({
  realtimeWeather,
}: {
  realtimeWeather: UseQueryResult;
}) => {
  const { isLoading, data }: { isLoading: boolean; data: any } =
    realtimeWeather;

  if (isLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center font-semibold mb-4">
        <ClockLoader color="#38bdf8" />
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="flex items-center justify-between font-semibold mb-4">
        <h2 className="text-lg font-bold">Today overview</h2>
        <Link
          to="#!"
          className="flex items-center text-sm text-sky-400 hover:text-sky-500"
        >
          <p className="mr-2">More Details</p> <BsBoxArrowUpRight />
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div className="flex items-center">
            <span className="text-5xl text-sky-400 mr-4">
              <TiWeatherWindy />
            </span>
            <div className="font-semibold">
              <h3 className="text-gray-400">Wind Speed</h3>
              <h1 className="text-2xl font-bold">
                {data && data.current.wind_kph} km/h
              </h1>
            </div>
          </div>

          <div className="flex items-center font-semibold">
            <span className="text-sky-400 text-lg mr-2">
              <AiOutlineCompass />
            </span>
            <p className="text-gray-400">
              {data && data.current.wind_degree} deg,{" "}
              {data && data.current.wind_dir}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div className="flex items-center">
            <span className="text-5xl text-sky-400 mr-4">
              <TiWeatherShower />
            </span>
            <div className="font-semibold">
              <h3 className="text-gray-400">Rain Chance</h3>
              <h1 className="text-2xl font-bold">
                {data && data.forecast.forecastday[0].day.daily_chance_of_rain}{" "}
                %
              </h1>
            </div>
          </div>

          <div className="flex items-center font-semibold">
            <span className="text-sky-400 text-2xl mr-2">
              <WiHumidity />
            </span>
            <p className="text-gray-400">
              {data && data.forecast.forecastday[0].day.avghumidity} %
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div className="flex items-center">
            <span className="text-5xl text-sky-400 mr-4">
              <MdWaves />
            </span>
            <div className="font-semibold">
              <h3 className="text-gray-400">Pressure</h3>
              <h1 className="text-2xl font-bold">
                {data && (data.current.pressure_in * 29.92).toFixed(2)} mm
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
          <div className="flex items-center">
            <span className="text-5xl text-sky-400 mr-4">
              <TiWeatherSunny />
            </span>
            <div className="font-semibold">
              <h3 className="text-gray-400">UV Index</h3>
              <h1 className={`text-2xl font-bold flex `}>
                {data && data.current.uv}
              </h1>
            </div>
          </div>

          <div className="font-semibold">
            <span
              className={`text-3xl mr-2 flex items-center  ${
                data &&
                (data.current.uv > 10
                  ? "text-red-500"
                  : data.current.uv > 7
                  ? "text-orange-500"
                  : data.current.uv > 5
                  ? "text-amber-400"
                  : data.current.uv > 2
                  ? "text-green-400"
                  : "text-green-300")
              }`}
            >
              <RiTempColdFill /> <FaRadiationAlt />
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between font-semibold mb-4">
          <h2 className="text-lg font-bold">Average Hourly Data</h2>
          <Link
            to="#!"
            className="flex items-center text-sm text-sky-400 hover:text-sky-500"
          >
            <p className="mr-2">More Details</p> <BsBoxArrowUpRight />
          </Link>
        </div>
        <div className="w-full">
          <Linechart lineData={data && data.forecast.forecastday[0].hour} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
