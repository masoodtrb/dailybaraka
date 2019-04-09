import fetch from "isomorphic-unfetch";

async function create(data) {
  const response = await fetch(
    process.env.API_URL + "api/shop/retailers/v1/create",
    {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  return await response.json();
}

export { create };
