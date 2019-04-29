const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const request = require("request");
const URL = require("url-parse");

const routes = require("./routes");

const environment = process.env.NODE_ENV || "development";
const app = next({ dev: environment === "development" });

const handler = routes.getRequestHandler(app);

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = locale => {
  return require(`./lang/${locale}.json`);
};

// express setup
app.prepare().then(() => {
  const server = express();

  // basic parsers
  server.use(bodyParser.json());

  // api proxy on development environment
  if (environment === "development") {
    // proxy on /api
    server.use("/api/", (req, res) => {
      const url = process.env.API_URL + "/api" + req.url;

      // request headers
      const headers = {
        "content-type": "application/json"
      };
      if (req.headers["content-type"]) {
        headers["content-type"] = req.headers["content-type"];
      }
      if (req.headers.authorization) {
        headers.Authorization = req.headers.authorization;
      }

      // request options
      const options = {
        method: req.method,
        url,
        headers,
        body: req.body,
        json: true
      };

      // proxy the request to api
      request(options, (error, response, body) => {
        if (error) throw new Error(error);

        res.json(body);
      });
    });
  }
  // next handler on GET
  server.get("*", (req, res) => {
    // get selected locale from req path
    const urlPathName = new URL(req.url).pathname;
    const selectedLocale =
      urlPathName.split("/").length > 0 ? urlPathName.split("/")[1] : "en";

    // TODO: get languages from api
    // if pathname first part is not in languages list, it means static content
    if (["en", "de"].indexOf(selectedLocale) === -1) return handler(req, res);

    // set local and translations in req to access in pages
    req.locale = selectedLocale;
    req.messages =
      environment === "development" ? {} : getMessages(selectedLocale);

    return handler(req, res);
  });

  // run on specific port
  const port = process.env.port || 3000;
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Read on http://localhost:${port}`);
  });
});
