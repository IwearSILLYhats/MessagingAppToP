import express from "express";
const messageRouter = express.Router();
import { PrismaClient } from "../prisma";
const prisma = new PrismaClient();

export default messageRouter;
