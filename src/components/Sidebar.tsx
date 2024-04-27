import { Link, NavLink } from "react-router-dom";

import { BsMap } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdLogout, MdOutlineDashboardCustomize } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { TiWeatherWindyCloudy } from "react-icons/ti";

const Sidebar = ({ side }: { side: boolean }) => {
  const activeLink =
    "flex items-center py-2 px-4 my-2 hover:text-sky-300 text-sky-500 font-bold";
  const normalLink = "flex items-center py-2 px-4 my-2 hover:text-sky-300";
  return (
    <div
      className={`hidden md:flex ${
        !side && "translate-x-[-100%]"
      } transition-transform duration-200 ease-in-out md:w-60 fixed left-0 bg-gray-100 h-screen p-4 2xl:text-lg font-semibold text-gray-500  flex-col`}
    >
      <Link
        to={"/"}
        className="flex items-center text-sky-400 text-xl font-bold"
      >
        <span className="text-4xl mr-2">
          <TiWeatherWindyCloudy />
        </span>
        Weatheria
      </Link>
      <nav className="mt-4">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span className="text-lg w-8">
            <MdOutlineDashboardCustomize />
          </span>{" "}
          Dashboard
        </NavLink>
        <NavLink
          to={"/home/map"}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span className="text-lg w-8">
            <BsMap />
          </span>{" "}
          Map
        </NavLink>
        <NavLink
          to={"/home/savedlocation"}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span className="text-lg w-8">
            <GoLocation />
          </span>{" "}
          Saved Location
        </NavLink>
        {/* <NavLink to={'/home/calendar'} className={({isActive})=>isActive? activeLink : normalLink}><span className='text-lg w-8'><BsCalendar3 /></span> Calendar</NavLink> */}
      </nav>
      <div className="mt-auto">
        <h2>System</h2>
        <nav className="">
          <NavLink
            to={"/home/settings"}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <span className="text-lg w-8">
              <SlSettings />
            </span>{" "}
            Settings
          </NavLink>
          <NavLink
            to={"/login"}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <span className="text-lg w-8">
              <MdLogout />
            </span>{" "}
            Logout
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
