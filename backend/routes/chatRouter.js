const express = require("express");
const chatRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const protectedRoute = require("../auth/auth");

chatRouter.get("/", protectedRoute, async (req, res) => {
  // request all chats for user
  const chats = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      Chat: true,
    },
  });
});
chatRouter.post("/", protectedRoute, async (req, res) => {
  // create new chat
  try {
    const { title, img_url, users } = req.body;
    const type = users.length > 1 ? "GROUP" : "DIRECT";
    const newChat = await prisma.chat.create({
      data: {
        user_id: req.user.id,
        title: title,
        img_url: img_url,
        type: type,
        users: {
          connect: users.map((id) => ({ id })),
        },
      },
    });
    if (newChat) {
      return res.json(newChat);
    }
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

module.exports = chatRouter;
