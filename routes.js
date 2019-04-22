const routes = require("next-routes");

module.exports = routes()
  // Account Pages
  .add("register", "/:lang/signUp")
  .add("login", "/:lang/signIn")
  .add("forgot-password", "/:lang/forgot-password")
  .add("reset-password", "/:lang/reset-password/:key")
  .add("profile", "/:lang/profile")

  // General Pages
  .add("home", "/:lang", "index")
  .add("page", "/:lang/page/:slug")
  .add("search", "/:lang/search")
  .add("product", "/:lang/product/:slug")
  .add("sectors", "/:lang/sectors")
  .add("sector", "/:lang/sector/:id/:name")

  // Other Pages
  .add("supplier", "/:lang/supplier/:id/:name")
  .add("commercial-enquiries", "/:lang/commercial-enquiries")
  .add("local-stores", "/:lang/local-stores");
  .add("user-feeds", "/user-feeds");
