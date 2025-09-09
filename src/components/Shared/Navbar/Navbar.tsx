import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import { navLinks } from "./navlinks";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const location = useLocation();

  return (
    <div
      className={`py-4 lg:py-5 sticky top-0 z-50 transition-all duration-300 border-b border-neutral-45/15 backdrop-blur-none lg:backdrop-blur-md bg-white shadow-sm`}
    >
      <Container>
        <nav className="flex items-center font-Nunito justify-between">
          {/* Logo and Brand */}
          <Link to="/">
            <img src={ICONS.logo} alt="Logo" className="w-56" />
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-Nunito hover:text-primary-40 transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-primary-40 font-bold"
                    : "text-neutral-10 font-semibold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <Link to={"/signup"}>
              <Button label="Sign Up" variant="tertiary" className="text-sm" />
            </Link>
            <Link to={"/tutor-register"}>
              <Button
                label="Become A Tutor"
                variant="quaternary"
                className="text-sm"
              />
            </Link>
          </div>
          <div className="flex lg:hidden items-center gap-3">
            {/* <Button label="Sign In" variant="primary" className="text-sm" /> */}
            <HamburgerMenu />
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
