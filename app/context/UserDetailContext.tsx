import { UserDetail } from "@/types/types";
import { createContext } from "react";

type UserDetailContextType = {
  userDetail: UserDetail | null;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail | null>>;
};
export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
});
