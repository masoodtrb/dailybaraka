const routes = require("next-routes");

module.exports = routes()
  .add("home", "/", "index")
  .add("search", "/search")
  .add("product", "/product/:id-:name")
  .add("sectors", "/sectors")
  .add("sector", "/sector/:id-:name")
  .add("supplier", "/supplier/:id-:name")
  .add("signIn", "/signIn")
  .add("signUp", "/signUp")
  .add("commercial-enquiries", "/commercial-enquiries");
