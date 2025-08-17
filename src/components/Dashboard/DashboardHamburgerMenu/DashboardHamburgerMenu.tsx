import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { tutorDashboardLinks } from "../../../data/dashboardSidebarLinks";

const DashboardHamburgerMenu = () => {
  const location = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const closestDropdown = target.closest(".hamburgerMenu");
      if (isHamburgerOpen && closestDropdown === null) {
        setIsHamburgerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isHamburgerOpen]);
  return (
    <div className="relative hamburgerMenu flex lg:hidden">
      <button
        onClick={toggleHamburgerMenu}
        className="bg-white py-2 px-3 border border-primary-10 cursor-pointer w-fit rounded-lg flex items-center justify-center"
      >
        <img src={ICONS.menu} alt="menu-icon" />
      </button>

      {/* Background Overlay */}
      <div
        onClick={toggleHamburgerMenu}
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isHamburgerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Side Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white py-8 p-6 w-[300px] overflow-y-auto transition-all duration-300 transform flex flex-col items-start justify-between ${
          isHamburgerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex justify-between items-center gap-5 w-full border-b border-neutral-30/50 pb-4">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={toggleHamburgerMenu}
            >
              <img src={ICONS.logo} alt="Logo" className="size-10" />
              <span className="text-lg font-bold text-primary-40">
                Bright Tuition Care
              </span>
            </Link>
            <button onClick={toggleHamburgerMenu}>
              <RxCross2 className="text-neutral-10 text-2xl" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-5">
            {tutorDashboardLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleHamburgerMenu}
                className={`text-lg font-semibold transition ${
                  location.pathname === link.path
                    ? "text-primary-40 font-bold"
                    : "text-neutral-10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button className="py-2 px-4 border border-primary-10 rounded-md text-primary-40 font-medium">
            Sign Up
          </button>
          <button className="py-2 px-4 bg-primary-10 text-white rounded-md font-medium">
            Become A Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHamburgerMenu;
