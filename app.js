const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config({ path: "config.env" });
require("./db/conn");
app.use(express.json());
app.use(cookieParser());
const { json } = require("express");

// Router files ----------->>>>>>>>>>>
app.use(require("./router/auth"));
const PORT = process.env.PORT || 7000;

if ((process.env.NODE_ENV = "production")) {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening successfully at port: ${PORT}`);
});
