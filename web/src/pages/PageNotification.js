import React from 'react';
import ButtonLogin from "components/buttons/ButtonLogin.js";

interface PageNotificationProps {
}

const PageNotification: React.FC<PageNotificationProps> = (props) => {

  const getContent = () => {
    if (!props.user?.loggedIn) {
      return (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <ButtonLogin
            className="PageNotification-ButtonLogin fade-in h4"
            user={props.user}
          />
        </div>
      )
    }

    if (false) {
      return (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <div className="fade-in">
            Provide email

            <input/>
          </div>
        </div>
      )
    }

    return (
      <div className="d-flex flex-column h-100 w-100 fade-in">
        <div className="d-flex flex-column flex-md-row flex-md-grow-0">
          <div className="flex-md-grow-1">
            <h4>My notification scope</h4>
          </div>

          <div className="flex-md-grow-0">
            <h4>Data</h4>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row flex-md-grow-1">
          <div className="flex-md-grow-1">
            <h4>My notifications</h4>
          </div>

          <div className="flex-md-grow-0">
            <h4>Players</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="PageNotification" className="h-100 w-100">
      <div className="container h-100 w-100 px-4 py-5">
        {getContent()}
      </div>
    </div>
  );
};

export default PageNotification;