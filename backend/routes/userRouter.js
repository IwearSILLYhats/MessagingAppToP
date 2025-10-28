import express from "express";
const userRouter = express.Router();
import { PrismaClient } from "../prisma";
const prisma = new PrismaClient();

export default userRouter;
