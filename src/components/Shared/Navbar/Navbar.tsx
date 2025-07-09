import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import NavLinkItem from "./NavLinksItems";

const navLinks = [
  { to: "/job-board", label: "Job Board" },
  { to: "/tutorial", label: "Tutorial" },
  { to: "/contact-us", label: "Contact Us" },
];

const Navbar = () => {
  return (
    <Container>
      <nav className="flex items-center justify-between  bg-white mt-7">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <img src={ICONS.logo} alt="Logo" className="size-13" />
          <span className="text-xl leading-[24px] font-bold text-primary-40">
            Bright Tuition Care
          </span>
        </div>

        {/* Nav Links - Loop here */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLinkItem key={link.to} to={link.to} label={link.label} />
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
       
          <Button
                label="Sign Up"
                variant="tertiary"
                className="text-sm"
              />

          <Button
                label="Become A Tutor"
                variant="quaternary"
                className="text-sm"
                
              />
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
