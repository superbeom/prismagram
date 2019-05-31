import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({ email });
      if (exists) {
        throw Error("This email is already taken");
      }

      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });

      return true;
    }
  }
};
