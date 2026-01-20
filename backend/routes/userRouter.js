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

    const [relationship, directMessage] = await Promise.all([
      prisma.friendship.findFirst({
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
        include: {
          friendChat: true,
        },
      }),
      prisma.chat.findFirst({
        where: {
          OR: [
            {
              user_id: req.user.id,
              users: {
                some: {
                  id: req.body.friendId,
                },
              },
            },
            {
              user_id: req.user.id,
              users: {
                some: {
                  id: req.body.friendId,
                },
              },
            },
          ],
          type: "DIRECT",
        },
      }),
    ]);
    if (
      relationship &&
      relationship.user_id !== req.user.id &&
      relationship.friend_id !== req.user.id
    ) {
      throw new Error("User not authorized");
    }
    if (relationship) {
      return res.json({ message: "Relationship already exists" });
    }
    let friendship;
    if (directMessage) {
      friendship = await prisma.friendship.create({
        data: {
          user: { connect: { id: req.user.id } },
          friend: { connect: { id: req.body.friendId } },
          friendChat: { connect: { id: directMessage.id } },
        },
      });
    } else {
      friendship = await prisma.friendship.create({
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
    }
    return res.json({ error: null, success: "Friend request sent!" });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});
userRouter.patch(
  "/friend/:friendship/:action",
  protectedRoute,
  async (req, res) => {
    // TODO - updates existing friendship status
    try {
      const friendship = await prisma.findUnique({
        where: {
          id: parseInt(req.params.friendship),
        },
      });
      if (!friendship) {
        throw new Error("Relationship not found");
      }
      if (
        friendship.user_id !== req.user.id &&
        friendship.friend_id !== req.user.id
      ) {
        throw new Error("User not authorized");
      }
      // check if user was initiator or recipient of original request
      const userRole = req.user.id === friendship.user_id;
      const action = req.params.action;
      if (
        action === "accept" &&
        friendship.blocked_by === null &&
        userRole === true
      ) {
        await prisma.friendship.update({
          where: {
            id: friendship.id,
          },
          data: {
            status: "ACCEPTED",
            friendChat: {
              update: {
                data: {
                  last_message: new Date(),
                },
              },
            },
          },
        });
        return res.json("Friend request accepted");
      } else if (action === "cancel" && friendship.blocked_by === null) {
        await prisma.friendship.delete({
          where: {
            id: friendship.id,
          },
          data: {
            friendChat: {
              update: {
                data: {
                  last_message: new Date(),
                },
              },
            },
          },
        });
        return res.json("Friendship successfully deleted");
      } else if (action === "block" && blocked_by === null) {
        await prisma.friendship.update({
          where: {
            id: friendship.id,
          },
          data: {
            blocked_by: `${req.user.id}`,
            status: "PENDING",
            friendChat: {
              update: {
                data: {
                  last_message: new Date(),
                },
              },
            },
          },
        });
        return res.json("User successfully blocked");
      } else if (action === "unblock" && blocked_by === req.user.id) {
        await prisma.friendship.update({
          where: {
            id: friendship.id,
          },
          data: {
            blocked_by: null,
            status: "PENDING",
            friendChat: {
              update: {
                data: {
                  last_message: new Date(),
                },
              },
            },
          },
        });
        return res.json("User successfully unblocked");
      }
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
);

module.exports = userRouter;
