var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const acessoRouter = require("./routes/acesso");
const opRouter = require("./routes/operacoes");
const install = require("./routes/install");
const swaggerFile = require('./doc_swagger.json');
const swaggerUI = require('swagger-ui-express');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", acessoRouter);
app.use("/principal", opRouter);
app.use("/install", install);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.get("/teste", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ msg: "Erro!" });
});

module.exports = app;
