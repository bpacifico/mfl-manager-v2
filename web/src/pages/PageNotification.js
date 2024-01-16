import React, { useState, useEffect } from 'react';
import ButtonLogin from "components/buttons/ButtonLogin.js";
import LoadingSquare from "components/loading/LoadingSquare.js";
import BoxMessage from "components/box/BoxMessage.js";
import UtilConditionalRender from "components/utils/UtilConditionalRender.js";
import PopupNotificationScope from "components/popups/PopupNotificationScope.js";
import ItemNotificationScope from "components/items/ItemNotificationScope.js";
import ItemNotification from "components/items/ItemNotification.js";
import ButtonMflPlayerInfo from "components/buttons/ButtonMflPlayerInfo.js";
import ButtonMflPlayer from "components/buttons/ButtonMflPlayer.js";
import { getNotificationScopesAndNotifications, getNotificationsOfNotificationScope } from "services/api-assistant.js";
import { validateEmail } from "utils/re.js";

interface PageNotificationProps {
}

const PageNotification: React.FC<PageNotificationProps> = (props) => {
  const [notificationScopes, setNotificationScopes] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [selectedNotificationScope, setSelectedNotificationScope] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [emailValue, setEmailValue] = useState("");

  const fetchNotificationScopesAndNotifications = () => {
    getNotificationScopesAndNotifications(
      (v) => {
        setNotificationScopes(v.data.getNotificationScopes);
        setNotifications(v.data.getNotifications);
      },
      (e) => console.log(e)
    );
  }

  useEffect(() => {
    fetchNotificationScopesAndNotifications();
  }, [props.assistantUser]);

  useEffect(() => {
    setNotifications(null);
    if (selectedNotificationScope?.id) {
      getNotificationsOfNotificationScope(
        (v) => {
          setNotifications(v.data.getNotifications);
        },
        (e) => console.log(e),
        selectedNotificationScope.id
      );
    } else {
      setNotifications([]);
    }
  }, [selectedNotificationScope]);

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

    if (props.user?.loggedIn && !props.assistantUser?.email) {
      return (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <div className="fade-in">
            <div>Please provide your email:</div>

            <div>
              <input
                type="email"
                className="form-control w-100 text-white"
                value={emailValue}
                onChange={(v) => setEmailValue(v.target.value)}
                placeholder={"email@example.com..."}
                autoFocus
              />

              <button
                className="btn btn-info btn-small text-white"
                onClick={() => props.updateAssistantUser(emailValue)}
                disabled={!validateEmail(emailValue)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="d-flex flex-column h-100 w-100 fade-in">
        <div className="d-flex flex-column flex-md-row flex-md-grow-0 flex-basis-300">
          <div className="card c d-flex flex-column flex-md-grow-0 flex-basis-300 m-2 p-3 pt-2">
            <div>
              <h4>Email information</h4>
            </div>

            <div className="d-flex flex-fill">
              {props.user?.loggedIn && props.assistantUser
                ? <div>
                  <div className="my-2">
                    <div className="lh-1">Address:</div>
                    <div className="text-white">{props.assistantUser.email}</div>
                  </div>
                  <div className="my-2">
                    <div className="lh-1">Status:</div>
                    <div className="text-white">
                      {props.assistantUser.is_email_confirmed
                        ? <div className="text-info">Confirmed</div>
                        : <div className="text-warning">Waiting for confirmation</div>
                      }
                    </div>
                  </div>
                  <div className="my-2">
                    {!props.assistantUser.is_email_confirmed
                      && <button
                        className="d-block btn btn-info btn-sm text-white mb-1"
                        onClick={() => props.updateAssistantUser(null)}
                      >
                        <i className="bi bi-envelope-arrow-up-fill"></i> Send new confirmation link
                      </button>
                    }
                    <button
                      className="d-block btn btn-danger btn-sm text-white mb-1"
                      onClick={() => props.updateAssistantUser(null)}
                    >
                      <i className="bi bi-trash3"></i> Delete email
                    </button>
                  </div>
                </div>
                : <LoadingSquare />
              }
            </div>
          </div>

          <div className="card d-flex flex-column flex-md-grow-1 m-2 p-3 pt-2">
            <div className="d-flex flex-row mb-2">
              <h4 className="flex-grow-1">Notification scopes</h4>

              {notificationScopes?.length > 0
                && <PopupNotificationScope
                  trigger={
                    <button
                      className="btn btn-info btn-sm text-white">
                      <i className="bi bi-plus"></i>
                    </button>
                  }
                  onClose={fetchNotificationScopesAndNotifications}
                />
              }
            </div>

            <div className="d-flex flex-fill">
              <UtilConditionalRender
                value={notificationScopes}
                renderUndefined={() => <LoadingSquare />}
                renderEmpty={
                  () => <BoxMessage
                    content={
                      <div>
                        <div>No scope found</div>
                        <PopupNotificationScope
                          trigger={
                            <button
                              className="btn btn-info btn-sm text-white">
                              <i className="bi bi-plus"></i> Add scope
                            </button>
                          }
                          onClose={fetchNotificationScopesAndNotifications}
                        />
                      </div>
                    }
                  />
                }
                renderOk={
                  () => <div className="w-100">
                    {notificationScopes.map((s) => (
                      <ItemNotificationScope
                        item={s}
                        isSelected={selectedNotificationScope?.id === s.id}
                        onSelect={(s) => {
                          setSelectedNotificationScope(
                            selectedNotificationScope?.id !== s.id ? s : null
                          );
                        }}
                      />
                    ))}
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row flex-md-grow-1">
          <div className="card d-flex flex-column flex-md-grow-1 m-2 p-3 pt-2">
            <div className="h4 mb-2">Notifications</div>

            <div className="d-flex flex-fill">
              <UtilConditionalRender
                value={notifications}
                renderUndefined={() => <LoadingSquare />}
                renderEmpty={() => <BoxMessage content={"No notification found"} />}
                renderOk={
                  () => <div className="w-100">
                    {notifications.map((n) => (
                      <ItemNotification
                        item={n}
                        isSelected={selectedNotification?.id === n.id}
                        onSelect={(n) => {
                          setSelectedNotification(
                            selectedNotification?.id !== n.id ? n : null
                          );
                        }}
                      />
                    ))}
                  </div>
                }
              />
            </div>
          </div>

          <div className="card d-flex flex-column flex-md-grow-0 flex-basis-200 m-2 p-3 pt-2">
            <h4 className="mb-2">Players</h4>

            <div className="d-flex flex-fill">
              <UtilConditionalRender
                value={selectedNotification?.playerIds}
                renderUndefined={() => <BoxMessage content={"No notification selected"} />}
                renderEmpty={() => <BoxMessage content={"No player to display"} />}
                renderOk={
                  () => <div className="w-100">
                    {selectedNotification.playerIds.map((id) => (
                      <div className="d-flex flex-column">
                        <div className="d-flex align-self-center mb-1">
                          <img
                            className="w-100 px-2"
                            src={"https://d13e14gtps4iwl.cloudfront.net/players/" + id + "/card_512.png"}
                            alt={"Player " + id}
                          />
                        </div>
                        <div className="d-flex align-self-center">
                          <ButtonMflPlayer
                            playerId={id}
                          />
                          <ButtonMflPlayerInfo
                            playerId={id}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            </div>
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