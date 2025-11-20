const express = require("express");
const chatRouter = require("./chatRouter");
const messageRouter = require("./messageRouter");
const userRouter = require("./userRouter");
const index = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const protectedRoute = require("../auth/auth");

index.get("/", protectedRoute, async (req, res) => {
  try {
    //fetch friends list and chat list
    const userData = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        username: true,
        profile_img_url: true,
        joined_date: true,
        last_activity: true,
        acct_status: true,
        friends: {
          where: {
            status: "ACCEPTED",
          },
          select: {
            friend: {
              omit: {
                email: true,
                password: true,
              },
            },
          },
        },
        friendOf: {
          where: {
            status: "ACCEPTED",
          },
          select: {
            user: {
              omit: {
                email: true,
                password: true,
              },
            },
          },
        },
        Chat: true,
      },
    });
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
index.post("/signup", async (req, res) => {
  try {
    //TODO - check if user exists for email, create new user, encrypt password
    const { confirm, email, password, username } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    //errors
    let errors = [];
    if (user) errors.push("User already exists");
    if (confirm !== password) errors.push("Passwords do not match");
    if (errors.length > 0) return res.json({ error: errors, success: null });

    //add new user to db
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });
    return res.json({
      error: null,
      success: "New user created, please login!",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error, success: null });
  }
});
index.post("/login", async (req, res) => {
  try {
    //TODO - verify via email and password, pass JWT to frontend
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // Check for existing user and password match
    if (!user) return res.json({ error: "Incorrect email", success: null });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.json({ error: "Incorrect password", success: null });

    // generate token
    const token = await jwt.sign({ id: user.id }, process.env.SECRET);
    return res.json({ success: "Logging you in!", error: null, token: token });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

index.use("/chat", chatRouter);
index.use("/message", messageRouter);
index.use("/user", userRouter);

module.exports = index;
