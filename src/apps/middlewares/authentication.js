const { decryptedToken } = require("../../utils/token");
const { decrypt } = require("../../utils/crypt");

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("Decoding token:", token);
    const { userId } = await decryptedToken(token);
    console.log("Decoded userId:", userId);

    req.userId = parseInt(decrypt(userId), 10);

    if (isNaN(req.userId)) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Invalid userId format." });
    }

    return next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized. Token decoding failed." });
  }
};

module.exports = { verifyJwt };
