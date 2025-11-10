import { verify } from "jsonwebtoken";
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function protectedRoute(req, res, next) {
  try {
    const token = await verify(
      req.header.authorization.split(" ")[1],
      process.env.SECRET
    );
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(token.id),
      },
    });
    if (user) req.user = user;
    return next(req, res);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}
