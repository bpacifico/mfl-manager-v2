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

export const getPlayerCount = (handleSuccess, handleError, params) => get(
  getApiEndpoint()
    + "players?limit=1&withCount=true&excludingMflOwned=true&"
    + transformDictToUrlParams(params),
  handleSuccess,
  handleError,
);

export const getUnderContractPlayers = (handleSuccess, handleError, params) => get(
  getApiEndpoint()
    + "players?limit=400&withCount=true&sorts=metadata.overall&sortsOrders=ASC&excludingMflOwned=true&isFreeAgent=false&"
    + transformDictToUrlParams(params),
  handleSuccess,
  handleError,
);

export const getPlayerSales = (handleSuccess, handleError, params) => get(
  getApiEndpoint()
    + "listings?limit=25&type=PLAYER&status=BOUGHT&"
    + transformDictToUrlParams(params),
  handleSuccess,
  handleError,
);
