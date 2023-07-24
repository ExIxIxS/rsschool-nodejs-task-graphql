/* eslint-disable @typescript-eslint/no-unsafe-return */

import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.types.js";
import { Context, NoArgs } from "../interfaces/app.interfaces.js";
import { profileType } from "./profile.types.js";
import { postType } from "./post.types.js";
import { User } from "../interfaces/user.interfaces.js";

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: profileType,
      resolve: async(source: User, _: NoArgs, { profileByUserIdLoader }: Context) => profileByUserIdLoader.load(source.id),
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async(source: User, _: NoArgs, { postsByAuthorIdLoader }: Context) => postsByAuthorIdLoader.load(source.id),
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (source: User, _: NoArgs, { userLoader }: Context) =>
        source.userSubscribedTo
          ? userLoader.loadMany(source.userSubscribedTo.map(({ authorId }) => authorId))
          : null
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (source: User, _: NoArgs, { userLoader }: Context) =>
        source.subscribedToUser
          ? userLoader.loadMany(source.subscribedToUser.map(({ subscriberId }) => subscriberId))
          : null
    }
  }),
});

const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const changeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export { userType, createUserInputType, changeUserInputType };