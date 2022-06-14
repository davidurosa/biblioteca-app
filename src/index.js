import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';
import  './scss/custom.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
      domain="dev-qzys3uaa.us.auth0.com"
      clientId="2xZLdNh1cYylRcAG3n6nhSJcFXu0Mipd"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);


