import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;

      const existsEmail = await prisma.$exists.user({ email });
      const existsUsername = await prisma.$exists.user({ username });

      if (existsEmail) {
        throw Error("This email is already taken");
      } else if (existsUsername) {
        throw Error("This username is already taken");
      }

      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });

      return true;
    },
  },
};
