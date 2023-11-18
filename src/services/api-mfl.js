import { get } from "utils/request.js";
import { getApiEndpoint } from "utils/env.js";
import { transformDictToUrlParams } from "utils/url.js";

export const getPastCompetitions = (handleSuccess, handleError) => get(
  getApiEndpoint() + "competitions?past=true",
  handleSuccess,
  handleError,
);

export const getUpcomingCompetitions = (handleSuccess, handleError) => get(
  getApiEndpoint() + "competitions?upcoming=true",
  handleSuccess,
  handleError,
);

export const getUnderContractPlayers = (handleSuccess, handleError, params) => get(
  getApiEndpoint()
    + "players?limit=400&sorts=metadata.overall&sortsOrders=DESC&excludingMflOwned=true&isFreeAgent=false&"
    + transformDictToUrlParams(params),
  handleSuccess,
  handleError,
);

export const getPlayerTrades = (handleSuccess, handleError, params) => get(
  getApiEndpoint()
    + "listings?limit=25&type=PLAYER&status=BOUGHT&"
    + transformDictToUrlParams(params),
  handleSuccess,
  handleError,
);
