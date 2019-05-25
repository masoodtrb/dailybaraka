import fetch from "isomorphic-unfetch";

async function getPageContent(lang, slug) {
  const response = await fetch(
    process.env.API_URL + "/api/shop/static-pages/v1/slug/" + slug,
    {
      headers: {
        lang: lang.toUpperCase()
      }
    }
  );
  return await response.json();
}

export { getPageContent };
