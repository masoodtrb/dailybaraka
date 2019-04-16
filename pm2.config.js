var path = require("path");

module.exports = {
  apps: [
    {
      name: "daily-web-ui",
      script: path.resolve(__dirname, "./server.js"),
      watch: true,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        port: 9990
      }
    }
  ]
};
