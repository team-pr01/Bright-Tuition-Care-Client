import { NavLink } from 'react-router-dom';

type NavLinkItemProps = {
  to: string;
  label: string;
};

const NavLinkItem = ({ to, label }: NavLinkItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-lg transition-colors font-Nunito font-semibold  ${
          isActive ? 'text-primary-10 ' : 'text-neutral-10'
        } hover:text-blue-500`
      }
    >
      {label}
    </NavLink>
  );
};

export default NavLinkItem;
