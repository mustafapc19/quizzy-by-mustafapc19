const setToLocalStorage = ({
  authToken,
  email,
  userId,
  userFirstName,
  userLastName,
  role,
  attemptId = null,
}) => {
  if (authToken) localStorage.setItem("authToken", JSON.stringify(authToken));

  if (email) localStorage.setItem("authEmail", JSON.stringify(email));

  if (userId) localStorage.setItem("authUserId", JSON.stringify(userId));

  if (userFirstName) {
    localStorage.setItem("firstName", JSON.stringify(userFirstName));
  }

  if (userLastName) {
    localStorage.setItem("lastName", JSON.stringify(userLastName));
  }

  if (attemptId) localStorage.setItem("attemptId", JSON.stringify(attemptId));

  if (role) localStorage.setItem("role", JSON.stringify(role));
};

const clearAuthFromLocalStorage = () => {
  localStorage.setItem("authToken", JSON.stringify(null));
  localStorage.setItem("authEmail", JSON.stringify(null));
  localStorage.setItem("authUserId", JSON.stringify(null));
  localStorage.setItem("firstName", JSON.stringify(null));
  localStorage.setItem("lastName", JSON.stringify(null));
  localStorage.setItem("attemptId", JSON.stringify(null));
  localStorage.setItem("role", JSON.stringify(null));
};

const getUserDataFromLocalStorage = () => {
  return {
    email: getFromLocalStorage("authEmail"),
    userId: getFromLocalStorage("authUserId"),
    firstName: getFromLocalStorage("firstName"),
    lastName: getFromLocalStorage("lastName"),
    attemptId: getFromLocalStorage("attemptId"),
    role: getFromLocalStorage("role"),
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
