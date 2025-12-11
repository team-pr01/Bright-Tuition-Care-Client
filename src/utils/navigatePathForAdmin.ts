import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../types/loggedinUser.types";

export const useNavigatePathForAdmin = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const navigatePath = user?.role === "admin" ? "admin" : "staff";
  return navigatePath;
};