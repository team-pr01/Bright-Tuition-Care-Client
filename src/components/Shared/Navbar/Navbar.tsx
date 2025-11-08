import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import { navLinks } from "./navlinks";
import HamburgerMenu from "./HamburgerMenu";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";

const Navbar = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const location = useLocation();
  const dashboardPath =
    user?.role === "tutor"
      ? "tutor"
      : user?.role === "admin"
      ? "admin"
      : user?.role === "guardian"
      ? "guardian"
      : "staff";

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
          <div className="hidden lg:flex">
            {!user && (
              <div className="hidden lg:flex items-center gap-5">
                <Link to={"/signin"}>
                  <Button
                    label="Sign In"
                    variant="tertiary"
                    className="text-sm"
                  />
                </Link>
                <Link to={"/signup"}>
                  <Button
                    label="Become A Tutor"
                    variant="quaternary"
                    className="text-sm"
                  />
                </Link>
              </div>
            )}
            {user && (
              <Link to={`/dashboard/${dashboardPath}/home`}>
                <Button
                  label="Dashboard"
                  variant="quaternary"
                  className="text-sm"
                />
              </Link>
            )}
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
