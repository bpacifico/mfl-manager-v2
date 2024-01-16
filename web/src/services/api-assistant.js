import { get, post } from "utils/request.js";
import { getApiEndpoint, getGraphQLEndpoint } from "utils/env.js";
import { jsonToParams } from "utils/graphql.js";

/* NONCE */

export const getGenerateNonce = (handleSuccess, handleError) => get(
  getApiEndpoint() + "api/generate_nonce",
  handleSuccess,
  handleError,
);

/* GRAPHQL */

/* User */

export const getUsers = (handleSuccess, handleError, params) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      {
        getUsers(address: "${params.address}") {
          address,
          email
        }
      }
    `,
  }),
  handleSuccess,
  handleError,
);

export const addUser = (handleSuccess, handleError, params) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `
      mutation {
        addUser(address: "${params.address}") {
          user {
            address,
            email
          }
        }
      }
    `,
  }),
  handleSuccess,
  handleError,
);

export const updateUser = (handleSuccess, handleError, params) => post(
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
  handleSuccess,
  handleError,
);

/* Notification */

export const getNotificationScopesAndNotifications = (handleSuccess, handleError) => post(
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
        getNotifications {
          id,
          playerIds,
          notificationScope {
            id
          }
        }
      }`
    ,
  }),
  (v) => handleSuccess(v),
  handleError,
);

export const getNotificationsOfNotificationScope = (handleSuccess, handleError, id) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: 
      `{
        getNotifications(notificationScope: "${id}") {
          id,
          playerIds,
          notificationScope {
            id
          }
        }
      }`
    ,
  }),
  (v) => handleSuccess(v),
  handleError,
);

export const addNotificationScope = (handleSuccess, handleError, params) => post(
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
  handleSuccess,
  handleError,
);
