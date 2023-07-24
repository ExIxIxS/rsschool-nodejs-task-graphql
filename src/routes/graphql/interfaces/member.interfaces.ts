import { MemberTypeId } from '../../member-types/schemas.js'

interface MemberType {
  id: MemberTypeId,
  discount: number,
  postsLimitPerMonth: number
}

export type { MemberType };
