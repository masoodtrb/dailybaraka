import fetch from "isomorphic-unfetch";

async function get(supplierId) {
  const response = await fetch(
    process.env.API_URL + "api/shop/suppliers/v1/load/" + supplierId
  );
  return await response.json();
}

async function create(data) {
  const response = await fetch(
    process.env.API_URL + "api/shop/suppliers/v1/create",
    {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  return await response.json();
}

export { get, create };
