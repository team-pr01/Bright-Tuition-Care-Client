/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";

type UserContextType = {
  user: any;
  isLoading: boolean;
};

// Create the context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the context
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
};
