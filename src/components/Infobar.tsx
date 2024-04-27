import moment from "moment/moment";
import { TiWeatherShower, TiWeatherSnow } from "react-icons/ti";
import { WiSunrise, WiSunset } from "react-icons/wi";
import Lottie from "react-lottie-player";
import { ClockLoader } from "react-spinners";

//Lottie
import notfound from "../assets/lottie/58200-no-internet.json";
import forbidden from "../assets/lottie/86535-forbidden403.json";
import { UseQueryResult } from "react-query";

const Infobar = ({ realtimeWeather }: { realtimeWeather: UseQueryResult }) => {
  const {
    isLoading,
    data,
    isError,
    error,
  }: {
    isLoading: boolean;
    data: any;
    isError: boolean;
    error: any;
  } = realtimeWeather;

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 w-80 min-h-screen flex items-center justify-center text-gray-100 p-4">
        <ClockLoader color="#38bdf8" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 w-80 flex items-center justify-center text-gray-100 p-4">
        <Lottie
          loop
          animationData={error.response.status === 403 ? forbidden : notfound}
          play
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-900 md:w-80 md:fixed md:right-0 min-h-screen md:z-50 text-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            {data && data.location.name}
          </h2>
          <p className="text-sm text-gray-400">
            {data && data.location.tz_id}, {data && data.location.country}
          </p>
        </div>
        <h2 className="font-semibold">
          {moment(data && data.location.localtime).format("LT")}
        </h2>
      </div>
      <div className="flex justify-between items-end mb-4">
        <div>
          <span className="text-5xl text-gray-100/70">
            {/* <TiWeatherPartlySunny /> */}
            <img src={data && data.current.condition.icon} alt="" />
          </span>
          <h1 className="text-3xl font-semibold">
            {data && data.current.temp_c} &#176; C
          </h1>
        </div>
        <h2 className="font-semibold text-gray-100/80">
          {data && data.current.condition.text}
        </h2>
      </div>
      <hr className="h-0 border border-slate-700 mb-4" />
      <div className="font-semibold text-gray-400 mb-4">
        <h2 className="mb-2 text-gray-100">Daily Condition</h2>
        <div className="flex items-center justify-between my-1">
          <span className="flex items-center">
            <TiWeatherShower className="text-4xl mr-2" />
            <p>Rain</p>
          </span>
          <h2>
            {data && data.forecast.forecastday[0].day.daily_chance_of_rain} %
          </h2>
        </div>
        <div className="flex items-center justify-between my-1">
          <span className="flex items-center">
            <TiWeatherSnow className="text-4xl mr-2" />
            <p>Snow</p>
          </span>
          <h2>
            {data && data.forecast.forecastday[0].day.daily_chance_of_snow} %
          </h2>
        </div>
      </div>
      <div className="font-semibold text-gray-400 mb-4">
        <h2 className="mb-2 text-gray-100">Last Updated</h2>
        <p>{moment(data && data.current.last_updated).fromNow()}</p>
      </div>
      <div>
        <div className="flex font-semibold items-center justify-between mb-4">
          <h2>Sunrise & Sunset</h2>
          {/* <span className="flex items-center text-sm text-gray-400"><p className="mr-2">Kirtipur</p> <BiChevronDown /></span> */}
        </div>
        <div className="flex justify-between items-center text-gray-400 py-2 px-3 border-2 border-slate-700 hover:border-slate-600 bg-slate-700 rounded-md my-2 font-semibold">
          <div className="flex items-center">
            <span className="text-3xl mr-2">
              <WiSunrise />
            </span>
            <div>
              <h2>Sunrise</h2>
              <h1 className="text-gray-100">
                {data && data.forecast.forecastday[0].astro.sunrise}
              </h1>
            </div>
          </div>
          <p>
            {moment(
              (data && data.forecast.forecastday[0].date) +
                " " +
                (data && data.forecast.forecastday[0].astro.sunrise)
            ).fromNow()}
          </p>
        </div>
        <div className="flex justify-between items-center text-gray-400 py-2 px-3 border-2 border-slate-700 hover:border-slate-600 bg-slate-700 rounded-md my-2 font-semibold">
          <div className="flex items-center">
            <span className="text-3xl mr-2">
              <WiSunset />
            </span>
            <div>
              <h2>Sunset</h2>
              <h1 className="text-gray-100">
                {data && data.forecast.forecastday[0].astro.sunset}
              </h1>
            </div>
          </div>
          <p>
            {moment(
              (data && data.forecast.forecastday[0].date) +
                " " +
                (data && data.forecast.forecastday[0].astro.sunset)
            ).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Infobar;
