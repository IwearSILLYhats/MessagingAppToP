const express = require("express");
const userRouter = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const protectedRoute = require("../auth/auth");

userRouter.get("/friend/:username", async (req, res) => {
  // looks up an individual user
  try {
    const friend = await prisma.user.findUnique({
      select: {
        username: true,
        id: true,
        profile_img_url: true,
        acct_status: true,
        last_activity: true,
      },
      where: {
        username: req.params.username,
      },
    });
    if (!friend) {
      throw new Error("User not found");
    }
    if (friend.acct_status === "DEACTIVATED") {
      throw new Error("That acct has been deactivated");
    }
    return res.json(friend);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
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
    // adds a new friendship between user and requested friend
    const friendCheck = await prisma.friendship.findFirst({
      where: {
        OR: [
          {
            user_id: req.user.id,
            friend_id: req.body.friendId,
          },
          {
            user_id: req.body.friendId,
            friend_id: req.user.id,
          },
        ],
      },
    });
    if (friendCheck) {
      throw new Error("Friendship already exists");
    }
    const friendship = await prisma.friendship.create({
      data: {
        user: { connect: { id: req.user.id } },
        friend: { connect: { id: req.body.friendId } },
        friendChat: {
          create: {
            title: "Direct Message",
            type: "DIRECT",
            user_id: req.user.id,
            users: {
              connect: { id: req.body.friendId },
            },
          },
        },
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
