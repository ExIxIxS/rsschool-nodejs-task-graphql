import { MemberType, Profile } from "@prisma/client";

import DataLoader from "dataloader";
import { Post } from "./post.interfaces.js";
import { MemberTypeId } from "../../member-types/schemas.js";
import { User } from "./user.interfaces.js";

interface DataLoaders {
  postsByAuthorIdLoader: DataLoader<string, Post[]>,
  profileByUserIdLoader: DataLoader<string, Profile>,
  profilesByMemberTypeIdLoader: DataLoader<string, Profile[]>,
  memberTypeLoader: DataLoader<MemberTypeId, MemberType>,
  userLoader: DataLoader<string, User>,
};

export type { DataLoaders };
