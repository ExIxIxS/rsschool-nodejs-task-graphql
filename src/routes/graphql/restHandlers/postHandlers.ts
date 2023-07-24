import { PrismaAppData, ID, MissedArgs } from "../interfaces/app.interfaces.js";
import { PostInput } from "../interfaces/post.interfaces.js";

const postHandlers =  {
  post: getPost,
  posts: getPosts,
  createPost: createPost,
  changePost: changePost,
  deletePost: deletePost,
}

async function getPost({ id }: ID, { prisma }: PrismaAppData) {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
};

async function getPosts(_: MissedArgs, { prisma }: PrismaAppData) {
  const posts = await prisma.post.findMany();
  return posts;
};

async function createPost({ dto: data }: { dto: PostInput }, { prisma }: PrismaAppData) {
  const post = await prisma.post.create({ data });
  return post;
};

async function changePost({ id, dto: data}: ID & { dto: Partial<PostInput> }, { prisma }: PrismaAppData) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data,
    });
    return post;
  } catch {
    return null;
  }
};

async function deletePost({ id }: ID, { prisma }: PrismaAppData) {
  try {
    await prisma.post.delete({ where: { id } });
    return id;
  } catch {
    return null;
  }
};

export { postHandlers };
