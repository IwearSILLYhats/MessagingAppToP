const express = require("express");
const path = require("node:path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
const index = require("./routes/indexRouter");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND,
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use("/", index);

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});
