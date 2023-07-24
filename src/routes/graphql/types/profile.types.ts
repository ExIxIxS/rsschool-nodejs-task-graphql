import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.types.js";
import { memberType, memberTypeIdEnum } from "./member.types.js";
import { Context, NoArgs } from "../interfaces/app.interfaces.js";
import { userType } from "./user.types.js";
import { Profile } from "../interfaces/profile.interfaces.js";

const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(memberType),
      resolve: async (source: Profile, _: NoArgs, { memberTypeLoader }: Context) => memberTypeLoader.load(source.memberTypeId),
    },
    user: {
      type: userType as GraphQLObjectType,
      resolve: async (source: Profile, _: NoArgs, { userLoader }: Context) => userLoader.load(source.userId),
    },
  }),
});

const createProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(memberTypeIdEnum) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  },
});

const changeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: memberTypeIdEnum },
  },
});

export { profileType, createProfileInputType, changeProfileInputType };
