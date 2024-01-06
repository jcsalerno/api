const { Router } = require("express");

const routes = new Router();

routes.get("/health", (req, res) => {
  return res.send({ message: "Connect with sucess!" });
});

module.exports = routes;
