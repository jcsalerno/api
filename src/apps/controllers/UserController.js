const Users = require("../models/Users");

/*class UserController {
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
    res.send({ user });
  }
}

module.exports = new UserController();*/
const bcrypt = require("bcrypt");

class UserControler {
  async create(req, res) {
    const verifyUser = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (verifyUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Adicione a geração de hash da senha aqui
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Substitua o campo de senha no corpo da requisição pelo hash gerado
    req.body.password_hash = hashedPassword;
    delete req.body.password; // Remova o campo de senha do corpo

    const user = await Users.create(req.body);
    res.send({ user });
  }
}

module.exports = new UserControler();
