const express = require("express");
const cors = require("cors");
const didRoutes = require("./routes/didRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", didRoutes);

module.exports = app;