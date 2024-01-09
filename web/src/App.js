import React, { useState, useEffect } from "react";
import "App.css";
import "statics/css/bootstrap.min.css";
import "statics/bootstrap-icons.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter } from "react-router-dom";
import Router from "Router";
import * as fcl from "@onflow/fcl";
import { getApiEndpoint } from "utils/env.js";

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  const [user, setUser] = useState();
  const [accountProof, setAccountProof] = useState();

  const accountProofDataResolver = async () => {
    const response = await fetch(
      getApiEndpoint() + "api/generate_nonce",
      /* {
        method: "GET",
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
        }),
        credentials: undefined,
      } */
    );
    console.log(response);
    const content = await response.json();
    console.log({
      appIdentifier: "mfl-assistant",
    });
    return {
      appIdentifier: "mfl-assistant",
      nonce: content.nonce,
    };
  };

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
    fcl.config({
      "flow.network": "mainnet",
      "app.detail.title": "MFL Assistant",
      "accessNode.api": "https://rest-mainnet.onflow.org",
      "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
      "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
      "discovery.authn.include": ["0xead892083b3e2c6c"],
      "fcl.accountProof.resolver": accountProofDataResolver,
    });
  }, []);

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
