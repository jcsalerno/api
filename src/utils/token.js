/*const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const decryptedToken = async (authHeader) => {
  const [, token] = authHeader.split("");
  return promisify(jwt.verify)(token, process.env.HASH_BCRYPT);
};

module.exports = { decryptedToken };*/

const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const decryptedToken = async (authHeader) => {
  console.log("Valor de authHeader:", authHeader);

  try {
    const tokenArray = authHeader.split(" ");
    const token = tokenArray.length > 1 ? tokenArray[1] : null;

    // Adicione um console.log aqui para verificar o token antes de decodificar
    console.log("Token antes da decodificação:", token);

    if (!token) {
      throw new Error("Token ausente ou inválido");
    }

    return promisify(jwt.verify)(token, process.env.HASH_BCRYPT);
  } catch (error) {
    // Adicione um console.log aqui para verificar qualquer erro durante a decodificação
    console.error("Erro durante a decodificação do token:", error);
    throw error;
  }
};

module.exports = { decryptedToken };
