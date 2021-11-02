const setToLocalStorage = ({
  authToken,
  email,
  userId,
  userFirstName,
  userLastName,
}) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserFirstName", JSON.stringify(userFirstName));
  localStorage.setItem("authUserLastName", JSON.stringify(userLastName));
};

const clearAuthFromLocalStorage = () => {
  localStorage.setItem("authToken", JSON.stringify(null));
  localStorage.setItem("authEmail", JSON.stringify(null));
  localStorage.setItem("authUserId", JSON.stringify(null));
  localStorage.setItem("authUserFirstName", JSON.stringify(null));
  localStorage.setItem("authUserLastName", JSON.stringify(null));
};

const getFromLocalStorage = key => {
  let storedValue = null;
  try {
    storedValue = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(null));
    logger.error(error);
  }
  return storedValue;
};

export { setToLocalStorage, getFromLocalStorage, clearAuthFromLocalStorage };
