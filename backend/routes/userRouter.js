const express = require("express");
const userRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = userRouter;
