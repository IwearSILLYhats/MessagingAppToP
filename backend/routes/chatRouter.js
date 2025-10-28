import express from "express";
const chatRouter = express.Router();
import { PrismaClient } from "../prisma";
const prisma = new PrismaClient();

export default chatRouter;
