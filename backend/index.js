import express from "express";
import path from "node:path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "./generated/prisma";
import expressSession from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaSessionStone } from "@quixo3/prisma-session-store";
const prisma = new PrismaClient();
import index from "./routes/indexRouter";

const app = express();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: username,
          },
        });
      } catch (error) {}
    }
  )
);

app.use(
  cors({
    origin: process.env.FRONTEND,
    methods: "GET,PUT,POST,DELETE",
    credentials: TRUE,
    optionsSuccessStatus: 204,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStone(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use("/", index);

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});
