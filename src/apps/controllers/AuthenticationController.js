const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

class AuthenticationController {
  async authenticate(req, res) {
    const { email, user_name, password } = req.body;
    let whereClause = {};
    if (email) {
      whereClause = { email };
    } else if (user_name) {
      whereClause = { user_name };
    } else {
      return res.status(401).json({ error: "We need a email or password" });
    }
    const user = await Users.findOne({
      where: whereClause,
    });
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match!" });
    }
    const { id, user_name: userName } = user;
    const token = jwt.sign({ id }, process.env.HASH_BCRYPT, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({ user: { id, user_name: userName }, token: token });
  }
}

module.exports = new AuthenticationController();
