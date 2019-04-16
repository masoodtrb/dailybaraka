const routes = require("next-routes");

module.exports = routes()
  // Account Pages
  .add("register", "/signUp")
  .add("login", "/signIn")
  .add("forgot-password", "/forgot-password")
  .add("reset-password", "/reset-password/:key")
  .add("profile", "/profile")

  // General Pages
  .add("home", "/", "index")
  .add("page", "/page/:slug")
  .add("search", "/search")
  .add("product", "/product/:slug")
  .add("sectors", "/sectors")
  .add("sector", "/sector/:id-:name")

  // Other Pages
  .add("supplier", "/supplier/:id/:name")
  .add("commercial-enquiries", "/commercial-enquiries")
  .add("local-stores", "/local-stores");
