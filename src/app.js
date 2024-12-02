require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/", routes);

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
