const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Importar Rotas
const BirthdayRoutes = require("./routes/userRoutes");

app.use("/", BirthdayRoutes);

module.exports = app;
