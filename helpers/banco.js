const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const username = process.env.DB_USER2;
const password = process.env.DB_PASS2;

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@api.vxosfmf.mongodb.net/`
  )
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados ", err);
  });

module.exports = mongoose;
