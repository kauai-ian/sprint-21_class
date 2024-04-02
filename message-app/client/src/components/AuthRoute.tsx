import { Navigate, RouteProps } from "react-router-dom";

import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/react";

const AuthRoute: FC<RouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};
export default AuthRoute;
