import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;

      const post = await prisma.$exists.post({
        id,
        user: {
          id: user.id
        }
      });

      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            where: {
              id
            },
            data: {
              caption,
              location
            }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't do that!!");
      }
    }
  }
};
