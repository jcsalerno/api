const Users = require("../models/Users");

class UserController {
  async create(req, res) {
    const verifyUser = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (verifyUser) {
      return res.status(400).json({ message: "User already exits!" });
    }

    const user = await Users.create(req.body);
    if (!user) {
      return res.status(400).json({ message: "Failed to create a user!" });
    }
    return res.send({ message: "User created!" });
  }
}

module.exports = new UserController();

/*const bcrypt = require("bcrypt");
const Users = require("../models/Users");

class UserController {
  async create(req, res) {
    try {
      const verifyUser = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (verifyUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      // Gere um hash para a senha
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Substitua o campo de senha no corpo da requisição pelo hash gerado
      req.body.password_hash = hashedPassword;
      delete req.body.password; // Remova o campo de senha do corpo

      const user = await Users.create(req.body);

      if (!user) {
        return res.status(400).json({ message: "Failed to create a user!" });
      }

      return res
        .status(201)
        .json({ message: "User created successfully!", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new UserController();*/
