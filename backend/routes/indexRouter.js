import express from "express";
const index = express.Router();
import { PrismaClient } from "../prisma";
const prisma = new PrismaClient();

index.get("/", async (req, res) => {
  let response;
  try {
    //TODO - fetch friends list and chat list
  } catch (error) {}
});

export default index;
