import { useState, FC, createContext, ReactNode, useEffect } from "react";
import { IUser } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import * as api from "../api/users";

export type UserContextType = {
  currentUser: IUser | undefined;
  setCurrentUser: (user: IUser) => void;
  isLoadingUser: boolean;
  users: IUser[];
  addUser: (user: IUser) => void;
};

const initState: UserContextType = {
  currentUser: undefined,
  setCurrentUser: () => {},
  isLoadingUser: true,
  users: [],
  addUser: () => {},
};

export const UserContext = createContext<UserContextType>(initState);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, user: auth0User } = useAuth0();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [users, setUsers] = useState<IUser[]>([]);

  const addUser = (user: IUser) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const fetchCurrentUser = async () => {
    if (isLoading || !isAuthenticated || !auth0User?.sub) {
      return;
    }
    try {
      const { data } = await api.getUser(auth0User.sub);

      if (!data) {
        throw new Error("Failed to get current user");
      }
      setCurrentUser(data);
      // Keep a record of all the users we have fetched so we don't have to make multiple requests
      addUser(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
    setIsLoadingUser(false);
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated || !auth0User) {
      setIsLoadingUser(false);
      return;
    }
    // Use the sub from the auth0User to fetch the user from our DB
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, auth0User]);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isLoadingUser, users, addUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
