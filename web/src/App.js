import React, { useState, useEffect } from "react";
import { NotificationManager as nm } from "react-notifications";
import "App.css";
import "statics/css/bootstrap.min.css";
import "statics/bootstrap-icons.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter } from "react-router-dom";
import Router from "Router";
import * as fcl from "@onflow/fcl";
import { login, logout, getLoggedUser, addLoggedUser, updateLoggedUserEmail } from "services/api-manager.js";
import { getApiEndpoint } from "utils/env.js";
import { verifyServiceData } from "utils/flow.js";

interface AppProps {}

const App: React.FC < AppProps > = (props) => {
  const [flowUser, setFlowUser] = useState();
  const [managerUser, setManagerUser] = useState();

  const accountProofDataResolver = async () => {
    const response = await fetch(getApiEndpoint() + "api/generate_nonce");
    const { nonce } = await response.json();

    return {
      appIdentifier: "mfl-manager",
      nonce,
    };
  };

  const getToken = () => {
    if (flowUser && flowUser.loggedIn) {
      let service = flowUser.services.filter((s) => s.type === "account-proof").pop();

      if (!service) {
        nm.error("Wallet service not found");
      } else {
        if (verifyServiceData(service)) {
          nm.error(verifyServiceData(service));
        } else {
          login({
            handleSuccess: (v) => { getManagerUser() },
            handleError: () => { fcl.unauthenticate(); },
            body: JSON.stringify(service.data),
          });
        }
      }
    }
  }

  const getManagerUser = () => {
    getLoggedUser({
      handleSuccess: (v) => {
        if (!v.data.getLoggedUser) {
          setFlowUser(null);
          getManagerUser(null);
        } else {
          getManagerUser(v.data.getLoggedUser);
        }
      },
      handleError: (v) => { return; },
    });
  }

  const updateManagerUser = (email) => {
    updateLoggedUserEmail({
      handleSuccess: (v) => {
        getManagerUser();
        nm.info("The confirmation link has been sent via email");
      },
      params: {
        email,
      }
    });
  }

  const clearUsers = () => {
    setFlowUser(null);
    setManagerUser(null);

    logout({
      handleSuccess: (v) => { nm.info("You have been logged out with success") },
    });
  }

  useEffect(() => {
    fcl.currentUser().subscribe(setFlowUser);
    fcl.config({
      "flow.network": "mainnet",
      "app.detail.title": "mfl-manager",
      "accessNode.api": "https://rest-mainnet.onflow.org",
      "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
      "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
      "discovery.authn.include": ["0xead892083b3e2c6c"],
      "fcl.accountProof.resolver": accountProofDataResolver,
    });

    if (flowUser && flowUser.loggedIn) {
      getToken();
    } else {
      getManagerUser();
    }
  }, []);

  useEffect(() => {
    if (flowUser && flowUser.loggedIn) {
      getToken();
    }
  }, [flowUser]);

  return (
    <div id="App">
      <BrowserRouter>
        <Router
          flowUser={flowUser}
          managerUser={managerUser}
          updateManagerUser={updateManagerUser}
          logout={clearUsers}
          {...props}
        />
        <NotificationContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;