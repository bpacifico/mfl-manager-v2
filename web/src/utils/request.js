import { getApiEndpoint } from "utils/env.js";

export const get = async (target, handleSuccess, handleError) => {
  try {
    const response = await fetch(
      target,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getApiEndpoint(),
          "Access-Control-Allow-Methods": "GET,OPTIONS,HEAD",
        },
      },
    );
    const jsonData = await response.json();
    handleSuccess(jsonData);
  } catch (error) {
    handleError(error);
  }
};

export const post = async (target, body, handleSuccess, handleError) => {
  try {
    const response = await fetch(
      target,
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getApiEndpoint(),
          "Access-Control-Allow-Methods": "POST,OPTIONS,HEAD",
        },
      },
    );
    handleSuccess(await response.json());
  } catch (error) {
    handleError(error);
  }
};