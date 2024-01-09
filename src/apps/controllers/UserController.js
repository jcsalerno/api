/*const Users = require("../models/Users");

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

module.exports = new UserController();*/

const bcrypt = require("bcrypt");
const Users = require("../models/Users");

class UserController {
  async create(req, res) {
    const verifyUser = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (verifyUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    try {
      // Gera o hash da senha
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Substitui a senha no corpo da requisição pelo hash gerado
      req.body.password_hash = hashedPassword;

      const user = await Users.create(req.body);
      return res.send({ message: "User created!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
