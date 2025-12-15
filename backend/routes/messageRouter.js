const express = require("express");
const messageRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const protectedRoute = require("../auth/auth");

messageRouter.get("/", protectedRoute, (req, res) => {
  try {
    return res.json(`Requesting messages for chatid: ${req.params.chatid}`);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

messageRouter.post("/", protectedRoute, (req, res) => {
  try {
    return res.json("Posting a new message");
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

module.exports = messageRouter;
