import fetch from "isomorphic-unfetch";

async function get(productId) {
  const response = await fetch(
    process.env.API_URL + "/api/shop/products/v1/load/" + productId
  );
  return await response.json();
}

async function getBySlug(slug) {
  const response = await fetch(
    process.env.API_URL + "/api/shop/products/v1/load-by-slug/" + slug
  );
  return await response.json();
}

async function search(sectorId, query) {
  let filters = [
    {
      field: "name",
      operator: "LIKE",
      value: query
    }
  ];
  if (sectorId) {
    filters.push({
      field: "categories.id",
      operator: "EQ",
      value: sectorId
    });
  }
  const response = await fetch(
    process.env.API_URL + "/api/shop/products/v1/search",
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        filters
      })
    }
  );
  return await response.json();
}

export { get, search, getBySlug };
