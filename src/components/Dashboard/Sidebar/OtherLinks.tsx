import { Link } from "react-router-dom";
import type { DashboardLink } from "../../../data/dashboardSidebarLinks";
import { LuFileText, LuShare2 } from "react-icons/lu";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";

const OtherLinks = ({
  user,
  setIsHamburgerOpen,
}: {
  user: TLoggedInUser;
  setIsHamburgerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const otherLinks = [
    {
      label: "Share The App",
      path: `/dashboard/${
        user?.role === "tutor" ? "tutor" : "guardian"
      }/share-app`,
      icon: <LuShare2 />,
    },
    {
      label: "Terms & Conditions",
      path: `/dashboard/${
        user?.role === "tutor" ? "tutor" : "guardian"
      }/terms-and-conditions`,
      icon: <LuFileText />,
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {otherLinks?.map((link: DashboardLink) => (
        <Link
          key={link?.label}
          to={link?.path}
          onClick={() => setIsHamburgerOpen && setIsHamburgerOpen(false)}
          className={`flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 ${
            location?.pathname === link?.path
              ? "bg-white text-primary-10 font-semibold"
              : "font-medium  text-white  bg-none"
          }`}
        >
          {link?.icon}
          {link?.label}
        </Link>
      ))}
    </div>
  );
};

export default OtherLinks;
