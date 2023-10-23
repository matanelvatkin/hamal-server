require('dotenv').config()
require("./DL/db").connect()
const express = require("express");
const app = express();
const PORT = 5556;
const cors = require("cors");
const mainRouter = require("./Routers");
app.use(express.json());
app.use(cors());

app.use("/api", mainRouter);
app.listen(PORT, () => {
  console.log("Server is running : listening to port " + PORT);
});