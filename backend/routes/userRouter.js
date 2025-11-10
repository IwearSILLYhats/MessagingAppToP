const express = require("express");
const userRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const protectedRoute = require("../auth/auth");

userRouter.get("/friend", protectedRoute, async (req, res) => {
  try {
    // requests all of user's friends
    const friends = await prisma.user.findUnique({
      where: {
        id: parseInt(req.user.id),
      },
      include: {
        friends: {
          omit: {
            password: true,
            email: true,
          },
        },
        friendOf: {
          omit: {
            password: true,
            email: true,
          },
        },
      },
    });
    return res.json(friends);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
userRouter.post("/friend", protectedRoute, async (req, res) => {
  try {
    // TODO - adds a new friendship between user and requested friend
    const friendship = await prisma.friendship.create({
      data: {
        user_id: req.user.id,
        friend_id: req.body.friendId,
      },
    });
    return res.json({ error: null, success: "Friend request sent!" });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
userRouter.put("/friend", protectedRoute, (req, res) => {
  // TODO - updates existing friendship status
});

module.exports = userRouter;
