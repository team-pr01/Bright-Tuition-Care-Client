import { Link, useNavigate } from "react-router-dom";
import UserProfilePhoto from "./UserProfilePhoto/UserProfilePhoto";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setUser,
  useCurrentUser,
} from "../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
import { ICONS, IMAGES } from "../../../assets";
import Cookies from "js-cookie";
import OtherLinks from "./OtherLinks";
import RoleBasedNavlinks from "./RoleBasedNavlinks/RoleBasedNavlinks";
import ToastMessage from "../../Reusable/ToastMessage/ToastMessage";
import toast from "react-hot-toast";

const Sidebar = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(setUser({ user: null, token: null }));
    Cookies.remove("accessToken");
    Cookies.remove("role");
    dispatch(logout());
    localStorage.clear();
    toast.custom(() => (
      <ToastMessage
        title="Logged Out Successfully!"
        subTitle="You have successfully logged out. You can log in anytime to access our services or receive further assistance."
      />
    ));
    navigate("/signin");
  };

  return (
    <div className="sticky top-0 left-0 hidden xl:block z-[9999]">
      <div className="w-[230px] 2xl:w-[270px] h-full bg-primary-10 p-5 font-Nunito flex flex-col gap-5 justify-between">
        {user?.role !== "admin" && (
          <Link to="/">
            <img src={ICONS.logoWhite} alt="Logo" className="mb-5" />
          </Link>
        )}
        {user?.role !== "admin" && <UserProfilePhoto />}
        {user?.role === "admin" || user?.role === "staff" ? (
          <Link to={"/"}>
            <img
              src={IMAGES.logoWhiteVertical}
              alt=""
              className="w-40 mx-auto"
            />
          </Link>
        ) : (
          ""
        )}
        <hr className="border border-neutral-50/30" />
        <div className="flex flex-col gap-4 h-full xl:h-[380px] 2xl:h-[600px] overflow-y-auto custom-scrollbar-sidebar">
          <RoleBasedNavlinks />

          <hr className="border border-neutral-50/30" />
          <OtherLinks user={user} />
        </div>

        <button
          onClick={handleLogout}
          className={`text-lg flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 text-white font-semibold cursor-pointer`}
        >
          <TbLogout2 className="text-xl" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
