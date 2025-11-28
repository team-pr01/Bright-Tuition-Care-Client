import { Link } from "react-router-dom";
import type { DashboardLink } from "../../../data/dashboardSidebarLinks";
import { LuAward, LuFileText, LuShare2 } from "react-icons/lu";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
import { RiFacebookFill } from "react-icons/ri";

const OtherLinks = ({
  user,
  setIsHamburgerOpen,
}: {
  user: TLoggedInUser;
  setIsHamburgerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const otherGuardianLinks = [
    {
      label: "Terms & Conditions",
      path: `/dashboard/${
        user?.role === "tutor"
          ? "tutor"
          : user?.role === "guardian"
          ? "guardian"
          : "admin"
      }/terms-and-conditions`,
      icon: <LuFileText />,
    },
    {
      label: "Share The App",
      path: `/dashboard/${
        user?.role === "tutor"
          ? "tutor"
          : user?.role === "guardian"
          ? "guardian"
          : "admin"
      }/share-app`,
      icon: <LuShare2 />,
    },
    {
      label: "Join Community",
      path: "/dashboard/guardian/community",
      icon: <RiFacebookFill />,
    },
  ];
  const otherTutorLinks = [
    {
      label: "Terms & Conditions",
      path: `/dashboard/${
        user?.role === "tutor"
          ? "tutor"
          : user?.role === "guardian"
          ? "guardian"
          : "admin"
      }/terms-and-conditions`,
      icon: <LuFileText />,
    },
    {
      label: "Refer And Earn",
      path: "/dashboard/tutor/refer-and-earn",
      icon: <LuAward />,
    },
    {
      label: "Share The App",
      path: `/dashboard/${
        user?.role === "tutor"
          ? "tutor"
          : user?.role === "guardian"
          ? "guardian"
          : "admin"
      }/share-app`,
      icon: <LuShare2 />,
    },
    {
      label: "Join Community",
      path: "/dashboard/tutor/community",
      icon: <RiFacebookFill />,
    },
  ];

  const otherLinks =
    user?.role === "guardian" ? otherGuardianLinks : otherTutorLinks;
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
