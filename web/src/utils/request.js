import { getApiEndpoint, getMflApiEndpoint } from "utils/env.js";

export const get = async (target, handleSuccess, handleError, credentials=true) => {
  try {
    const response = await fetch(
      target,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET,OPTIONS,HEAD",
          "Access-Control-Allow-Origin": target.startsWith(getApiEndpoint()) ? new URL(target).origin : undefined,
          "Access-Control-Allow-Credentials": target.startsWith(getApiEndpoint()) && credentials ? true : undefined,
        },
        credentials: target.startsWith(getApiEndpoint()) && credentials ? "include" : undefined,
      },
    );

    const jsonData = await response.json();

    if (jsonData.errors) {
      handleError(jsonData.errors);
    } else {
      handleSuccess(jsonData);
    }
  } catch (error) {
    handleError(error);
  }
};

export const post = async (target, body, handleSuccess, handleError, credentials=true) => {
  try {
    const response = await fetch(
      target,
      {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "POST,OPTIONS,HEAD",
          "Access-Control-Allow-Origin": target.startsWith(getApiEndpoint()) ? new URL(target).origin : undefined,
          "Access-Control-Allow-Credentials": target.startsWith(getApiEndpoint()) && credentials ? true : undefined,
          "Access-Control-Expose-Headers": target.endsWith("/api/login") ? "Set-Cookie" : undefined,
        },
        credentials: target.startsWith(getApiEndpoint()) && credentials ? "include" : undefined,
      },
    );

    const jsonData = await response.json();

    if (jsonData.errors) {
      handleError(jsonData);
    } else {
      handleSuccess(jsonData);
    }
  } catch (error) {
    handleError(error);
  }
};