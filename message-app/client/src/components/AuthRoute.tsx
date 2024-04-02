import { Navigate, RouteProps } from "react-router-dom";

import { FC } from "react";

const AuthRoute: FC<RouteProps> = ({ children }) => {

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};
export default AuthRoute;
