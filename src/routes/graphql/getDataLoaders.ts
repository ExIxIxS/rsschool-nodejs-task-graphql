import { MemberType, PrismaClient, Profile } from "@prisma/client";
import DataLoader from "dataloader";
import { MemberTypeId } from "../member-types/schemas.js";

import { DataLoaders } from "./interfaces/dataLoaders.interfaces.js";
import { User } from "./interfaces/user.interfaces.js";
import { Post } from "./interfaces/post.interfaces.js";

function getDataLoaders(prisma: PrismaClient): DataLoaders {
  return {
    postsByAuthorIdLoader: new DataLoader(getPostsByAuthorIdGetter(prisma)),
    profileByUserIdLoader: new DataLoader(getProfileByUserIdGetter(prisma)),
    profilesByMemberTypeIdLoader: new DataLoader(getProfilesByMemberTypeIdGetter(prisma)),
    memberTypeLoader: new DataLoader(getMemberTypeGetter(prisma)),
    userLoader: new DataLoader(getUserByIdgetter(prisma)),
  }
};

function getPostsByAuthorIdGetter(prisma: PrismaClient) {
  return async (ids: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: ids as string[] } },
    });

    const postMap = posts.reduce((acc, post) => {
      acc[post.authorId] ? acc[post.authorId].push(post) : acc[post.authorId] = [post];
      return acc;
    }, {} as Record<string, Post[]>);

    return ids.map(id => postMap[id]);
  };
}

function getProfileByUserIdGetter(prisma: PrismaClient) {
  return async (ids: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: ids as string[] } },
    });

    const profileMap = profiles.reduce((acc, profile) => {
      acc[profile.userId] = profile;
      return acc;
    }, {} as Record<string, Profile>);

    return ids.map(id => profileMap[id]);
  };
}

function getProfilesByMemberTypeIdGetter(prisma: PrismaClient) {
  return async (ids: readonly MemberTypeId[]) => {
    const profiles = await prisma.profile.findMany({
      where: { memberTypeId: { in: ids as MemberTypeId[] } },
    });

    const profileMap = profiles.reduce((acc, profile) => {
      acc[profile.memberTypeId] ? acc[profile.memberTypeId].push(profile) : acc[profile.memberTypeId] = [profile];
      return acc;
    }, {} as Record<string, Profile[]>);

    return ids.map(id => profileMap[id]);
  }
}

function getMemberTypeGetter(prisma: PrismaClient) {
  return async (ids: readonly MemberTypeId[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: ids as MemberTypeId[] }}
    });

    const memberTypeMap = memberTypes.reduce((acc, memberType) => {
      acc[memberType.id] = memberType;
      return acc;
    }, {} as Record<MemberTypeId, MemberType>);

    return ids.map(id => memberTypeMap[id]);
  };
}

function getUserByIdgetter(prisma: PrismaClient) {
  return async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: ids as string[] } },
      include: {
        userSubscribedTo: true,
        subscribedToUser: true,
      },
    });

    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, User>);

    return ids.map(id => userMap[id]);
  };
}

export { getDataLoaders };
