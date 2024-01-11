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
import { getApiEndpoint } from "utils/env.js";
import { getGenerateNonce, getUsers, addUser, updateUser } from "services/api-assistant.js";

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  const [user, setUser] = useState();
  const [assistantUser, setAssistantUser] = useState();
  const [accountProof, setAccountProof] = useState();

  const accountProofDataResolver = async () => {
    getGenerateNonce(
      (v) => ({
        appIdentifier: "mfl-assistant",
        nonce: v.nonce,
      }),
      (e) => console.log(e)
    )
  };

  const getAssistantUser = () => {
    getUsers(
      (v) => {
        if (v.data.getUsers.length === 0) {
          nm.warning("An error happened while retrieve the user");
        } else {
          setAssistantUser(v.data.getUsers[0])
        }
      },
      (e) => console.log(e),
      { address: user?.addr }
    );
  }

  const updateAssistantUser = (email) => {
    updateUser(
      (v) => getAssistantUser(),
      (e) => console.log(e),
      {
        address: user?.addr,
        email,
      }
    );
  }

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

  useEffect(() => {
    console.log(user)
    if (user?.addr) {
      addUser(
        (v) => { getAssistantUser() },
        (e) => console.log(e),
        { address: user?.addr }
      );
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
