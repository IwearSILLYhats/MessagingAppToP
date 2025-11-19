const verify = require("jsonwebtoken").verify;
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function protectedRoute(req, res, next) {
  try {
    const token = await verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );
    const user = await prisma.user.findUnique({
      where: {
        id: token.id,
      },
    });
    if (user) req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}
module.exports = protectedRoute;
