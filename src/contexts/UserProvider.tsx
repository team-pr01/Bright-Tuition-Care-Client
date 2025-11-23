import { useGetMeQuery } from "../redux/Features/User/userApi";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetMeQuery(undefined);

  return (
    <UserContext.Provider
      value={{
        user: data?.data || null,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
