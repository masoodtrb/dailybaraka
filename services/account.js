import fetch from "isomorphic-unfetch";

async function login(username, password) {
  const response = await fetch(
    process.env.API_URL + "panel/authenticate/v1/login",
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  return await response.json();
}

async function register(data) {
  const response = await fetch(
    process.env.API_URL + "panel/account/v1/register",
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  return await response.json();
}

export { login, register };
