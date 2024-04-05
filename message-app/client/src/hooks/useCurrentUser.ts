import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useCurrentUser = () => {
  const { currentUser, setCurrentUser, isLoadingUser } =
    useContext(UserContext);

  return { currentUser, setCurrentUser, isLoadingUser };
};

export default useCurrentUser;