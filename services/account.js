const getUserToken = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  return token;
};

const getCurrentUser = () => {
  let user = localStorage.getItem("user");
  if (!user) {
    user = sessionStorage.getItem("user");
  }

  return user;
};

export { getUserToken, getCurrentUser };
