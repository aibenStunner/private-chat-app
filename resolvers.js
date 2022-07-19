import pc from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";

const prisma = new pc.PrismaClient();

const resolvers = {
  Query: {
    users: async (_, __, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be logged in!");
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          id: {
            not: userId,
          },
        },
      });
      return users;
    },
    messagesByUser: async (_, { receiverId }, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be logged in!");
      const messages = await prisma.message.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          OR: [
            {
              senderId: userId,
              receiverId,
            },
            {
              senderId: receiverId,
              receiverId: userId,
            },
          ],
        },
      });
      return messages;
    },
  },

  Mutation: {
    signUpUser: async (_, { newUser }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: newUser.email },
      });

      if (existingUser)
        throw new AuthenticationError("User already exists with that email");

      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      const user = await prisma.user.create({
        data: {
          ...newUser,
          password: hashedPassword,
        },
      });

      return user;
    },

    signInUser: async (_, { userSignIn }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: userSignIn.email },
      });

      if (!existingUser)
        throw new AuthenticationError("User doesn't exist with that email");

      const validPassword = await bcrypt.compare(
        userSignIn.password,
        existingUser.password
      );

      if (!validPassword)
        throw new AuthenticationError("Email or password is invalid!");

      const token = jwt.sign(
        { userId: existingUser.id },
        process.env.JWT_SECRET
      );

      return { token };
    },

    createMessage: async (_, { receiverId, text }, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be logged in!");
      const message = await prisma.message.create({
        data: {
          text,
          receiverId,
          senderId: userId,
        },
      });
      return message;
    },
  },
};

export default resolvers;
