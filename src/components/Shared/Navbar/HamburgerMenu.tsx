import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import { navLinks } from "./navlinks";
import { RxCross2 } from "react-icons/rx";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu = ({ isOpen, onClose }: HamburgerMenuProps) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Menu Drawer */}
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-white z-50 transform transition-transform duration-300 shadow-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-neutral-30/50">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <img src={ICONS.logo} alt="Logo" className="size-10" />
            <span className="text-lg font-bold text-primary-40">
              Bright Tuition Care
            </span>
          </Link>
          <button onClick={onClose}>
            <RxCross2 className="text-neutral-10 text-2xl" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-5 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
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

        {/* Auth Buttons */}
        <div className="p-6 flex flex-col gap-3">
          <button className="py-2 px-4 border border-primary-10 rounded-md text-primary-40 font-medium">
            Sign Up
          </button>
          <button className="py-2 px-4 bg-primary-10 text-white rounded-md font-medium">
            Become A Tutor
          </button>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
