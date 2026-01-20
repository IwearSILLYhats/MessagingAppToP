const express = require("express");
const messageRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const protectedRoute = require("../auth/auth");

messageRouter.get("/", protectedRoute, (req, res) => {
  try {
    return res.json(`Requesting messages for chatid: ${req.params.chatid}`);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

messageRouter.post("/", protectedRoute, async (req, res) => {
  try {
    const newMessage = await prisma.message.create({
      data: {
        author: {
          connect: { id: req.user.id },
        },
        Chat: {
          connect: { id: req.chatid },
        },
        content: req.body.content,
        image_url: req.body.imageUrl,
      },
    });
    return res.json({ message: "Successfully posted new message." });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

module.exports = messageRouter;
