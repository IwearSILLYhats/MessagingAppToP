import express from "express";
const chats = express.Router();
import { PrismaClient } from "../prisma";
const prisma = new PrismaClient();

export default chats;
