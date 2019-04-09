const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const request = require("request");

const routes = require("./routes");

const app = next({ dev: process.env.NODE_ENV !== "production" });

const handler = routes.getRequestHandler(app);

// express setup
app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  // proxy on /api
  server.use("/api/", (req, res) => {
    const url = process.env.API_URL + "api" + req.url;

    var options = {
      method: req.method,
      url,
      headers: {
        "content-type": "application/json"
      },
      body: req.body,
      json: true
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);

      res.json(body);
    });
  });

  // next handler on GET
  server.get("*", (req, res) => {
    return handler(req, res);
  });

  // run on specific port
  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Read on http://localhost:3000");
  });
});
