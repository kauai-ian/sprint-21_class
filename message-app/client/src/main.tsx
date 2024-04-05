import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import MessagesProvider from "./context/messagesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-6lssfc5bmy8gbdxj.us.auth0.com"
      clientId="MgV7TUQxUjLC7mnzZE2wwF3sblYnuoJO"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
      }}
    >
      <MessagesProvider>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </MessagesProvider>
    </Auth0Provider>
  </React.StrictMode>
);
