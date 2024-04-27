import { NavLink } from "react-router-dom";

import { BsCalendar3, BsMap } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const Botnav = () => {
  const activeLink =
    "flex items-center py-2 px-4 my-2 hover:text-sky-300 text-sky-500 font-bold";
  const normalLink = "flex items-center py-2 px-4 my-2 hover:text-sky-300";
  return (
    <nav
      className={`fixed bottom-0 md:hidden w-full flex z-50 justify-between bg-gray-100 text-xl px-4 rounded-t-xl`}
    >
      <NavLink
        to={"/home/dashboard"}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <MdOutlineDashboardCustomize />
      </NavLink>
      <NavLink
        to={"/home/map"}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <BsMap />
      </NavLink>
      <NavLink
        to={"/home/savedlocation"}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <GoLocation />
      </NavLink>
      <NavLink
        to={"/home/calendar"}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <BsCalendar3 />
      </NavLink>
    </nav>
  );
};

export default Botnav;
