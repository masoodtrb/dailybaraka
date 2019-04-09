import fetch from "isomorphic-unfetch";

async function getAll() {
  const response = await fetch(
    process.env.API_URL + "api/shop/categories/v1/search",
    {
      method: "POST"
    }
  );
  return await response.json();
}

async function getSuppliersAndProducts(sectorId) {
  const response = await fetch(
    process.env.API_URL + "api/shop/suppliers/v1/fat-search",
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        filter: [
          {
            field: "categories.id",
            operator: "EQ",
            value: sectorId
          }
        ]
      })
    }
  );
  return await response.json();
}

export { getAll, getSuppliersAndProducts };
