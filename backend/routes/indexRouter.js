import express from "express";
import chatRouter from "./chatRouter";
import messageRouter from "./messageRouter";
import userRouter from "./userRouter";
const index = express.Router();
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

index.get("/", async (req, res) => {
  let response;
  try {
    //TODO - fetch friends list and chat list
    const [friends, chats] = await Promise.all([user, chat]);
  } catch (error) {}
});
index.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    //TODO - check if user exists for email, create new user, encrypt password
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    //errors
    if (user) throw new Error("User already exists");
    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });
  } catch (error) {}
});
index.post("/login", async (req, res) => {
  try {
    //TODO - verify via email and password, pass JWT to frontend
  } catch (error) {}
});
index.get("/logout", async (req, res) => {
  try {
    //TODO - remove user from session table
  } catch (error) {}
});

index.use("/chat", chatRouter);
index.use("/message", messageRouter);
index.use("/user", userRouter);

export default index;
