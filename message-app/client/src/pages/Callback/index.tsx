import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  console.log("callback", user, isLoading);
  const registerUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("token", token);
      if (!token) {
        throw new Error("No token found");
      }

      // Use the token and the user object to register the user
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      // TODO store the user in context
      console.log("User registered successfully");
      return navigate("/profile");
    } catch (error) {
      console.error(error);
    }
    return navigate("/");
  };

  useEffect(() => {
    registerUser();
  }, []);

  return <Spinner />;
};

export default Callback;
