import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useCurrentUser = () => {
  const { currentUser, setCurrentUser, isLoadingUser, users, addUser } =
    useContext(UserContext);

  return { currentUser, setCurrentUser, isLoadingUser, users, addUser };
};

export default useCurrentUser;
