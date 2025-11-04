const express = require("express");
const chatRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = chatRouter;
