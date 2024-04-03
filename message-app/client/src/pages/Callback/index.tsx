import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  // Once we have the user, send a request to the server to create a new user in our database
  //  once the user is stored in our db we can redirect the user to the profile page
  // This is kind of how it will look
  const createOrUpdateUser = async () => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => {
      navigate("/profile");
    });
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      createOrUpdateUser();
    }
  }, [isLoading, isAuthenticated, user]);

  return <Spinner />;
};

export default Callback;
