import { getApiEndpoint, getMflApiEndpoint } from "utils/env.js";

export const get = async (target, handleSuccess, handleError) => {
  try {
    const response = await fetch(
      target,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": target.startsWith(getMflApiEndpoint())
            ? getMflApiEndpoint() :  getApiEndpoint(),
          "Access-Control-Allow-Methods": "GET,OPTIONS,HEAD",
        },
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

export const post = async (target, body, handleSuccess, handleError) => {
  try {
    const response = await fetch(
      target,
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": target.startsWith(getMflApiEndpoint())
            ? getMflApiEndpoint() :  getApiEndpoint(),
          "Access-Control-Allow-Methods": "POST,OPTIONS,HEAD",
        },
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