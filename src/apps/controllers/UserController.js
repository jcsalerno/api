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
    try {
      const existingUser = await Users.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password_hash = hashedPassword;

      await Users.create(req.body);

      return res.status(201).json({ message: "User created!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req, res) {
    try {
      const userId = req.userId; // Certifique-se de ter o userId disponível aqui

      const user = await Users.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.status(400).json({ message: "User not exists!" });
      }

      const { old_password, new_password, confirm_new_password, ...updates } =
        req.body;

      if (old_password && !(await user.checkPassword(old_password))) {
        return res.status(401).json({ error: "Old password does not match!" });
      }

      if (new_password && new_password !== confirm_new_password) {
        return res.status(401).json({
          error: "New password and confirm new password do not match!",
        });
      }

      if (new_password) {
        updates.password_hash = await bcrypt.hash(new_password, 8);
      }

      await Users.update(updates, {
        where: { id: userId }, // Use userId aqui
      });

      return res.status(200).json({ message: "User updated!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async delete(req, res) {
    const userTodelete = await Users.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!userTodelete) {
      return res.status(400).json({ message: "User not exists!" });
    }
    await Users.destroy({
      where: {
        id: req.userId,
      },
    });
    return res.status(200).json({ message: "User deleted!" });
  }
}

module.exports = new UserController();
