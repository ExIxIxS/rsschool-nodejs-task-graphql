import { ID } from "../interfaces/app.interfaces.js";

interface PostInput {
  title: string;
  content: string;
  authorId: string;
};

interface Post extends ID, PostInput {}

export type { Post, PostInput };
