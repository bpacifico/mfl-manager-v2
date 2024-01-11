
export const get = async (target, handleSuccess, handleError) => {
  try {
    const response = await fetch(target);
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
        },
      },
    );
    handleSuccess(await response.json());
  } catch (error) {
    handleError(error);
  }
};