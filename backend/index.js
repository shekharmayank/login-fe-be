const express = require("express");
const cors = require("cors");
const { login } = require("./routes/index");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", login);

app.listen(3000, () => console.log("Server listening on port 3000"));
