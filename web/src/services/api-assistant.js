import { NotificationManager as nm } from "react-notifications";
import { get, post, loginPost } from "utils/request.js";
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

/* login */

export const login = ({ handleSuccess=null, handleError=null, body }) => loginPost(
  getApiEndpoint() + "api/login",
  body,
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
  true,
);

export const logout = ({ handleSuccess=null, handleError=null }) => loginPost(
  getApiEndpoint() + "api/logout",
  null,
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
  true,
);


/* NONCE */

export const getGenerateNonce = ({ handleSuccess=null, handleError=null }) => get(
  getApiEndpoint() + "api/generate_nonce",
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

/* GRAPHQL */

/* User */

export const getLoggedUser = ({ handleSuccess=null, handleError=null }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      {
        getLoggedUser {
          id,
          address,
          email,
          isEmailConfirmed
        }
      }
    `,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

export const  updateLoggedUserEmail = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      mutation {
        updateLoggedUserEmail(email: "${params.email}") {
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

export const sendConfirmationMail = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      mutation {
        sendConfirmationMail(address: "${params.address}", email: "${params.email}") {
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

export const getNotificationScopesAndNotifications = ({ handleSuccess=null, handleError=null }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: 
      `{
        getNotificationScopes {
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
        getNotifications(order: -1) {
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

export const getNotificationsOfNotificationScope = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: 
      `{
        getNotifications(${jsonToParams(params)}) {
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

export const deleteNotificationScope = ({ handleSuccess=null, handleError=null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      mutation {
        deleteNotificationScope(${jsonToParams(params)}) {
          notificationScope {
            id
          }
        }
      }
    `,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

/* Clubs */

export const getClubData = ({ handleSuccess=null, handleError=null }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: 
      `{
        getClubCount,
        getAllClubCount: getClubCount(foundedOnly: false),
        getClubDivisionCounts {
          key,
          count
        }
      }`
    ,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);