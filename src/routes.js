const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");
const { verifyJwt } = require("./apps/middlewares/authentication");
const AuthenticationController = require("./apps/controllers/AuthenticationController");
const authSchema = require("./schema/auth.schema.json");
const UserController = require("./apps/controllers/UserController");
const userSchema = require("./schema/create.user.schema.json");

const routes = new Router();

routes.post("/user", schemaValidator(userSchema), UserController.create);
routes.post(
  "/auth",
  schemaValidator(authSchema),
  AuthenticationController.authenticate
);

routes.get("/health", (req, res) => {
  return res.send({ message: "Connect with sucess!" });
});
routes.use(verifyJwt);
routes.put("/user", UserController.update);

module.exports = routes;
