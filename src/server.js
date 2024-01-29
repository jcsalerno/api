require("dotenv").config();
require("./database/index");
const routes = require("./routes");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`serve is on in port ${PORT}`);
});
