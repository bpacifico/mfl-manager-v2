import { NotificationManager as nm } from "react-notifications";
import { get, post } from "utils/request.js";
import { getApiEndpoint, getGraphQLEndpoint } from "utils/env.js";
import { jsonToParams } from "utils/graphql.js";

const defaultHandleSuccess = (h, v) => {
  if (h) {
    h(v);
  }
}

const defaultHandleError = (h, e) => {
  if (h) {
    h(e);
  } else {
    nm.warning("An error happened while requesting the API");
  }
}

/* NONCE */

export const getGenerateNonce = ({ handleSuccess=null, handleError=null }) => get(
  getApiEndpoint() + "api/generate_nonce",
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

/* GRAPHQL */

/* User */

export const getUsers = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      {
        getUsers(address: "${params.address}") {
          id,
          address,
          email
        }
      }
    `,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

export const addUser = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      mutation {
        addUser(address: "${params.address}") {
          user {
            id,
            address,
            email
          }
        }
      }
    `,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

export const updateUser = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      mutation {
        updateUser(address: "${params.address}", email: "${params.email}") {
          user {
            address,
            email
          }
        }
      }
    `,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

/* Notification */

export const getNotificationScopesAndNotifications = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: 
      `{
        getNotificationScopes(user: "${params.user}") {
          id,
          type,
          positions,
          nationalities,
          minPrice,
          maxPrice,
          minAge,
          maxAge,
          minOvr,
          maxOvr,
          minPac,
          maxPac,
          minDri,
          maxDri,
          minPas,
          maxPas,
          minSho,
          maxSho,
          minDef,
          maxDef,
          minPhy,
          maxPhy
        },
        getNotifications {
          id,
          status,
          playerIds,
          creationDate,
          sendingDate,
          notificationScope {
            id
          }
        }
      }`
    ,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

export const getNotificationsOfNotificationScope = ({ handleSuccess=null, handleError=null, id }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: 
      `{
        getNotifications(notificationScope: "${id}") {
          id,
          status,
          playerIds,
          creationDate,
          sendingDate,
          notificationScope {
            id
          }
        }
      }`
    ,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

export const addNotificationScope = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      mutation {
        addNotificationScope(${jsonToParams(params)}) {
          notificationScope {
            id,
            type
          }
        }
      }
    `,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);
