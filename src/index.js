const express = require("express");
const routes = require("./api/routes/index");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`));

module.exports = app;
