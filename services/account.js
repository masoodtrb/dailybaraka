import fetch from "isomorphic-unfetch";

const getUserToken = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  return token;
};

export { getUserToken };
