/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { changeUserInputType, createUserInputType, userType } from "./user.types.js";
import { UUIDType } from "./uuid.types.js";
import { changePostInputType, createPostInputType, postType } from "./post.types.js";
import { changeProfileInputType, createProfileInputType, profileType } from "./profile.types.js";

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        dto: { type: createUserInputType }
      },
    },
    changeUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changeUserInputType }
      }
    },
    deleteUser: {
      type: UUIDType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      }
    },
    createPost: {
      type: postType,
      args: {
        dto: { type: createPostInputType }
      },
    },
    changePost: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changePostInputType }
      }
    },
    deletePost: {
      type: UUIDType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      }
    },
    createProfile: {
      type: profileType,
      args: {
        dto: { type: createProfileInputType }
      },
    },
    changeProfile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changeProfileInputType }
      }
    },
    deleteProfile: {
      type: UUIDType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      }
    },
    subscribeTo: {
      type: userType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      }
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      }
    }
  },
});

export { mutationType };
