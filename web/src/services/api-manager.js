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

export const login = ({ handleSuccess = null, handleError = null, body }) => loginPost(
  getApiEndpoint() + "api/login",
  body,
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
  true,
);

export const logout = ({ handleSuccess = null, handleError = null }) => loginPost(
  getApiEndpoint() + "api/logout",
  null,
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
  true,
);


/* NONCE */

export const getGenerateNonce = ({ handleSuccess = null, handleError = null }) => get(
  getApiEndpoint() + "api/generate_nonce",
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);

/* GRAPHQL */

/* User */

export const getLoggedUser = ({ handleSuccess = null, handleError = null }) => post(
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

export const updateLoggedUserEmail = ({ handleSuccess = null, handleError = null, params }) => post(
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

export const sendConfirmationMail = ({ handleSuccess = null, handleError = null, params }) => post(
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

export const getPlayers = ({ handleSuccess = null, handleError = null, params }) => post(
  getGraphQLEndpoint(),
  JSON.stringify({
    query: `{
        getPlayers(${jsonToParams(params)}) {
          id,
          firstName,
          lastName,
          overall,
          nationalities,
          positions,
          pace,
          shooting,
          dribbling,
          passing,
          defense,
          physical,
          goalkeeping,
          resistance
        }
      }`,
  }),
  (v) => defaultHandleSuccess(handleSuccess, v),
  (e) => defaultHandleError(handleError, e),
);