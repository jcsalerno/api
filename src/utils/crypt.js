/*const { hash } = require("bcrypt");
const crypto = require("crypto");
const { text } = require("express");
const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_CRYPTO;
const iv = crypto.randomBytes(32);
const encrypt = (text) => {
  const cipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([
    cipher.update(text.toString()),
    cipher.final(),
  ]);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash) => {
  const [newIv, text] = hash.split(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(newIv, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(text, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
*/
const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");
const { promisify } = require("util");

const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_CRYPTO;

// Função para criptografar um texto
const encrypt = (text) => {
  // Cria um vetor de inicialização (iv) aleatório
  const iv = randomBytes(16);

  // Cria um cifrador usando o algoritmo AES-256-CTR, chave secreta e iv
  const cipher = createCipheriv(algorithm, secretKey, iv);

  // Atualiza o cifrador com o texto e finaliza a cifragem
  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(text, "utf-8")),
    cipher.final(),
  ]);

  // Retorna o iv e o conteúdo cifrado como strings hexadecimais
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

// Função para descriptografar um hash
const decrypt = (hash) => {
  // Divide o hash nas partes iv e conteúdo
  const [newIv, text] = hash.split(":");

  // Cria um decifrador usando o algoritmo AES-256-CTR, chave secreta e iv
  const decipher = createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(newIv, "hex")
  );

  // Atualiza o decifrador com o texto cifrado e finaliza a decifragem
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(text, "hex")),
    decipher.final(),
  ]);

  // Retorna o texto descriptografado como uma string UTF-8
  return decrypted.toString("utf-8");
};

module.exports = {
  encrypt,
  decrypt,
};
