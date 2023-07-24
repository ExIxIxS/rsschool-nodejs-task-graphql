import { PrismaAppData, ID, MissedArgs } from "../interfaces/app.interfaces.js";
import { ProfileInput } from "../interfaces/profile.interfaces.js";

const profileHandlers = {
  profile: getProfile,
  profiles: getProfiles,
  createProfile: createProfile,
  changeProfile: changeProfile,
  deleteProfile: deleteProfile,
};

async function getProfile({ id }: ID, { prisma }: PrismaAppData) {
  return await prisma.profile.findUnique({ where: { id } });
};

async function getProfiles(_: MissedArgs, { prisma }: PrismaAppData) {
  return await prisma.profile.findMany();
}

async function createProfile({ dto: data}: { dto: ProfileInput }, { prisma }: PrismaAppData) {
  try {
    return await prisma.profile.create({ data });
  } catch {
    return null;
  }
};

async function changeProfile({ id, dto: data}: ID & { dto: Partial<ProfileInput> }, { prisma }: PrismaAppData) {
  try {
    return await prisma.profile.update({
      where: { id },
      data
    });
  } catch {
    return null;
  }
};

async function deleteProfile({ id }: ID, { prisma }: PrismaAppData) {
  try {
    await prisma.profile.delete({ where: { id } });
    return id;
  } catch {
    return null;
  }
};

export { profileHandlers };
