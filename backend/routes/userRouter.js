import express from "express";
const users = express.Router();
import { PrismaClient } from "../prisma";
const prisma = new PrismaClient();

export default users;
