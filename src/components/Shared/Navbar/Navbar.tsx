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
    <div className="sticky top-0 z-[9999]">
      {/* Backdrop Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-md bg-neutral-50/10 border-b border-neutral-45/15"></div>

      {/* Navbar Content */}
      <div className="relative py-4 lg:py-5 shadow-sm">
        <Container>
          <nav className="flex items-center justify-between font-Nunito min-h-[50px]">
            {/* Logo */}
            <Link to="/">
              <img src={ICONS.logo} alt="Logo" className="w-56" />
            </Link>

            {/* Nav Links */}
            <div className="hidden lg:flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-primary-40 font-bold"
                      : "text-neutral-10 font-semibold hover:text-primary-40"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex">
              {!user ? (
                <div className="flex items-center gap-5">
                  <Link to="/signin">
                    <Button
                      label="Sign In"
                      variant="tertiary"
                      className="text-sm"
                    />
                  </Link>
                  <Link to="/signup/tutor">
                    <Button
                      label="Become A Tutor"
                      variant="quaternary"
                      className="text-sm"
                    />
                  </Link>
                </div>
              ) : (
                <Link to={`/dashboard/${dashboardPath}/home`}>
                  <Button
                    label="Dashboard"
                    variant="quaternary"
                    className="text-sm"
                  />
                </Link>
              )}
            </div>

            {/* Hamburger */}
            <div className="flex lg:hidden items-center gap-3">
              <HamburgerMenu />
            </div>
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
