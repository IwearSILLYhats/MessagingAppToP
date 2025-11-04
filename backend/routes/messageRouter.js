const express = require("express");
const messageRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = messageRouter;
