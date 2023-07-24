/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.types.js";
import { PrismaAppData, MissedArgs } from "../interfaces/app.interfaces.js";
import { userType } from "./user.types.js";
import { Post } from "../interfaces/post.interfaces.js";

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: userType,
      resolve: async (source: Post, _: MissedArgs, { userLoader }: PrismaAppData) => userLoader.load(source.authorId),
    },
  }),
});

const createPostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

const changePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export { postType, createPostInputType, changePostInputType };
