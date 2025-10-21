import express from "express";
const messages = express.Router();
import { PrismaClient } from "../prisma";
const prisma = new PrismaClient();

export default messages;
