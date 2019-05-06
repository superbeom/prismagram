import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    isFollowing: (parent, _, { request }) => {
      const { id: parentId } = parent;
      const { user } = request;

      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { id: parentId } = parent;
      const { user } = request;

      return user.id === parentId;
    }
  },
  Post: {
    isLiked: (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;

      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    }
  }
};
