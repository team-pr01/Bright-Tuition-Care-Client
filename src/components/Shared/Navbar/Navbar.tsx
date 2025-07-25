import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import { navLinks } from "./navlinks";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <div
      className={`py-7 sticky top-0 z-10 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-white/70 shadow-sm" : "bg-white"
      }`}
    >
      <Container>
        <nav className="flex items-center font-Nunito justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={ICONS.logo} alt="Logo" className="size-10 md:size-13" />
            <span className="text-sm md:text-xl leading-[24px] font-bold text-primary-40">
              Bright Tuition Care
            </span>
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
            <Button label="Sign Up" variant="tertiary" className="text-sm" />
            <Button
              label="Become A Tutor"
              variant="quaternary"
              className="text-sm"
            />
          </div>
          <div className="flex lg:hidden items-center gap-3">
            <Button label="Sign Up" variant="primary" className="text-sm" />
            {/* <HamburgerMenu/> */}
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
