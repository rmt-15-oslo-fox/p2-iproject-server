const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
module.exports = app;
