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
import { getUsers, addUser, updateUser } from "services/api-assistant.js";
import { getApiEndpoint } from "utils/env.js";

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  const [user, setUser] = useState();
  const [assistantUser, setAssistantUser] = useState();

  const accountProofDataResolver = async () => {
    const response = await fetch(getApiEndpoint() + "api/generate_nonce");
    const { nonce } = await response.json();

    return {
      appIdentifier: "mfl-assistant",
      nonce,
    };
  };

  const getAssistantUser = () => {
    getUsers({
      handleSuccess: (v) => {
        if (v.data.getUsers.length === 0) {
          nm.warning("User not found");
        } else {
          setAssistantUser(v.data.getUsers[0]);
        }
      },
      handleError: () => nm.error("Error while retrieving the user"),
      params: { address: user?.addr }
    });
  }

  const updateAssistantUser = (email) => {
    updateUser({
      handleSuccess: (v) => {
        getAssistantUser();
        nm.info("The confirmation link has been sent via email");
      },
      params: {
        address: user?.addr,
        email,
      }
    });
  }

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
    fcl.config({
      "flow.network": "mainnet",
      "app.detail.title": "mfl-assistant",
      "accessNode.api": "https://rest-mainnet.onflow.org",
      "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
      "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
      "discovery.authn.include": ["0xead892083b3e2c6c"],
      "fcl.accountProof.resolver": accountProofDataResolver,
    });

    if (user) {
      getAssistantUser();
    }
  }, []);

  useEffect(() => {
    if (user?.addr) {
      addUser({
        handleSuccess: (v) => { getAssistantUser() },
        params: { address: user?.addr }
      });
    }
  }, [user]);

  return (
    <div id="App">
      <BrowserRouter>
        <Router
          user={user}
          assistantUser={assistantUser}
          updateAssistantUser={updateAssistantUser}
          {...props}
        />
        <NotificationContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
