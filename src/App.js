import React from "react";
import "App.css";
import "statics/css/bootstrap.min.css";
import "statics/bootstrap-icons.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "AppRouter";

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  return (
    <div id="App">
      <BrowserRouter>
        <AppRouter {...props} />
        <NotificationContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
