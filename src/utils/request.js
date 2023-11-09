
export const get = async (target, handleSuccess, handleError) => {
  try {
    const response = await fetch(target);
    const jsonData = await response.json();
    handleSuccess(jsonData)
  } catch (error) {
    handleError(error);
  }
};