import fetch from "isomorphic-unfetch";

async function getPageContent(slug) {
  const response = await fetch(
    process.env.API_URL + "api/shop/static-pages/v1/slug/" + slug
  );
  return await response.json();
}

export { getPageContent };
