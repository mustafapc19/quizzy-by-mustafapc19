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
  localStorage.setItem("firstName", JSON.stringify(userFirstName));
  localStorage.setItem("lastName", JSON.stringify(userLastName));
};

const clearAuthFromLocalStorage = () => {
  localStorage.setItem("authToken", JSON.stringify(null));
  localStorage.setItem("authEmail", JSON.stringify(null));
  localStorage.setItem("authUserId", JSON.stringify(null));
  localStorage.setItem("firstName", JSON.stringify(null));
  localStorage.setItem("lastName", JSON.stringify(null));
};

const getUserDataFromLocalStorage = () => {
  return {
    email: JSON.parse(localStorage.getItem("authEmail")),
    userId: JSON.parse(localStorage.getItem("authUserId")),
    firstName: JSON.parse(localStorage.getItem("firstName")),
    lastName: JSON.parse(localStorage.getItem("lastName")),
  };
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

export {
  setToLocalStorage,
  getFromLocalStorage,
  clearAuthFromLocalStorage,
  getUserDataFromLocalStorage,
};
