const { Router } = require("express");
const { upload } = require("./configs/multer");
const schemaValidator = require("./apps/middlewares/schemaValidator");
const { verifyJwt } = require("./apps/middlewares/authentication");
const AuthenticationController = require("./apps/controllers/AuthenticationController");
const authSchema = require("./schema/auth.schema.json");
const UserController = require("./apps/controllers/UserController");
const userSchema = require("./schema/create.user.schema.json");
const FileController = require("./apps/controllers/FileController");
const PostController = require("./apps/controllers/PostController");
const postSchema = require("./schema/post.schema.json");

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
routes.delete("/user", UserController.delete);
routes.get("/user-profile", UserController.userProfile);

routes.post("/upload", upload.single("image"), FileController.upload);

routes.post("/new-post", schemaValidator(postSchema), PostController.create);
routes.delete("/delete-post/:id", PostController.delete);

module.exports = routes;
