import fetch from "isomorphic-unfetch";

async function get(lang,sectorId) {
  const response = await fetch(
    process.env.API_URL + "/api/shop/categories/v1/load/" + sectorId,
    {
      headers: {
        "lang": lang.toUpperCase()
      }
    }
  );
  return await response.json();
}

async function getAll(lang) {
  const response = await fetch(
    process.env.API_URL + "/api/shop/categories/v1/search",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "lang": lang.toUpperCase()
      },
      body: JSON.stringify({
        size: 1000
      })
    }
  );
  return await response.json();
}

async function getSuppliersAndProducts(lang,sectorId) {
  const response = await fetch(
    process.env.API_URL + "/api/shop/suppliers/v1/fat-search",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "lang": lang.toUpperCase()
      },
      body: JSON.stringify({
        filters: [
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

export { get, getAll, getSuppliersAndProducts };
