import { MemberTypeId } from "../../member-types/schemas.js";

import { ID } from "../interfaces/app.interfaces.js";

interface ProfileInput {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: MemberTypeId;
  userId: string;
};

interface Profile extends ID, ProfileInput {};

export type { Profile, ProfileInput };
