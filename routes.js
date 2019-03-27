const routes = require("next-routes");

module.exports = routes()
  .add("home", "/", "index")
  .add("search", "/search")
  .add("product", "/product/:id")
  .add("sectors", "/sectors")
  .add("sector", "/sector/:id")
  .add("supplier", "/supplier/:id")
  .add("signin", "/signin")
  .add("signup", "/signup")
  .add("commercial-enquiries", "/commercial-enquiries");
