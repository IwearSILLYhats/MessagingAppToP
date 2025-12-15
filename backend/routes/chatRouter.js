const express = require("express");
const chatRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const protectedRoute = require("../auth/auth");
const messageRouter = require("./messageRouter");

chatRouter.get("/:id", protectedRoute, async (req, res) => {
  try {
    //requests chat info and messages
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        title: true,
        img_url: true,
        type: true,
        owner: {
          select: {
            id: true,
            profile_img_url: true,
            username: true,
          },
        },
        users: {
          select: {
            id: true,
            profile_img_url: true,
            username: true,
          },
        },
        messages: {
          select: {
            id: true,
            user_id: true,
            image_url: true,
            content: true,
            posted_date: true,
          },
        },
      },
    });
    if (
      !chat ||
      (chat.owner.id !== req.user.id &&
        chat.users.every((user) => user.id !== req.user.id))
    ) {
      throw new Error("User not authorized");
    }
    return res.json({ ...chat, user: req.user.id });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

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
chatRouter.use("/:chatid/message", messageRouter);
module.exports = chatRouter;
