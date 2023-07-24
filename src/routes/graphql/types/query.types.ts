/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { userType } from "./user.types.js";
import { UUIDType } from "./uuid.types.js";
import { memberType, memberTypeIdEnum } from "./member.types.js";
import { postType } from "./post.types.js";
import { profileType } from "./profile.types.js";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLList(userType),
    },
    memberType: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(memberTypeIdEnum) },
      },
    },
    memberTypes: {
      type: new GraphQLList(memberType),
    },
    post: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    posts: {
      type: new GraphQLList(postType),
    },
    profile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
    },
  },
});

export { queryType };
