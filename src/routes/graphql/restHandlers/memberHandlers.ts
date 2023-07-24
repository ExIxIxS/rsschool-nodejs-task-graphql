import { PrismaAppData, ID, MissedArgs } from "../interfaces/app.interfaces.js";

const memberHandlers = {
  memberType: getMemberType,
  memberTypes: getMemberTypes,
};

async function getMemberType({ id }: ID, { prisma }: PrismaAppData) {
  return await prisma.memberType.findUnique({ where: { id } });
}

async function getMemberTypes (_: MissedArgs, { prisma }: PrismaAppData) {
  return await prisma.memberType.findMany();
}

export { memberHandlers };
