import { IoHomeOutline } from "react-icons/io5";
import { GoTable } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import LinkItem from "./LinkItem";
import { useState } from "react";

export default function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleOpenSideBar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <nav
      className={`md:flex-col flex md:space-y-1 px-4 md:mb-0 mb-4 bg-white border relative transition-all duration-500 ${
        openSidebar ? "md:w-80 w-full" : "w-24"
      }`}
    >
      <LinkItem
        text="Cadastro"
        icon={IoHomeOutline}
        link="/cadastro"
        hidden={!openSidebar}
      />
      <LinkItem
        text="Lista"
        icon={GoTable}
        link="/lista"
        hidden={!openSidebar}
      />
      <span
        className="bg-purple-500 rounded-full p-2 absolute top-9 right-[-16px] cursor-pointer hover:bg-purple-400 transition-transform hidden md:block"
        onClick={handleOpenSideBar}
      >
        <FaArrowRight
          className={`text-white h-4 w-4 transition-transform duration-500 ${
            openSidebar ? "" : "rotate-180"
          }`}
        />
      </span>
    </nav>
  );
}
