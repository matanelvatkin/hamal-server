require('dotenv').config()
require("./DL/db").connect()
const express = require("express");
const app = express();
const PORT = process.env.PORT ||5556
const cors = require("cors");
const mainRouter = require("./Routers");
app.use(express.json());
app.use(cors());

mainRouter.use("/logos",express.static('./logos'))


app.use("/api", mainRouter);
app.listen(PORT, () => {
  console.log("Server is running : listening to port " + PORT);
});