import React, { useState, useEffect } from "react";
import "App.css";
import "statics/css/bootstrap.min.css";
import "statics/bootstrap-icons.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter } from "react-router-dom";
import Router from "Router";
import * as fcl from "@onflow/fcl";
/* import { getApiEndpoint } from "utils/env.js"; */

/* const accountProofDataResolver = async () => {
  const response = await fetch(getApiEndpoint + "/generate_account");
  const { nonce } = await response.json();
  return {
    appIdentifier: "MFL Assistant",
    nonce,
  };
}; */

fcl.config({
  "flow.network": "mainnet",
  "app.detail.title": "MFL Assistant",
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
  "discovery.authn.include": ["0xead892083b3e2c6c"],
  /* "fcl.accountProof.resolver": accountProofDataResolver, */
});

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [user]);

  return (
    <div id="App">
      <BrowserRouter>
        <Router
          user={user}
          setUser={setUser}
          {...props}
        />
        <NotificationContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
