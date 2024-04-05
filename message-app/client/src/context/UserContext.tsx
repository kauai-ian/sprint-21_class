import { useState, FC, createContext, ReactNode } from "react";
import { IUser } from "../types";

export type UserContextType = {
  currentUser: IUser | undefined;
  setCurrentUser: (user: IUser) => void;
};

const initState: UserContextType = {
  currentUser: undefined,
  setCurrentUser: () => {},
};

export const UserContext = createContext<UserContextType>(
  initState
);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
