import { useAuth0 } from '@auth0/auth0-react';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};


const AuthRoute: FC<Props> = ({
  children
}) => {
  const { isAuthenticated, isLoading } = useAuth0();
  // IF not authenticated -> return to home page

  if (isLoading) {
    console.log("LOADING")
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

export default AuthRoute;