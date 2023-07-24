import { ID, Subscription } from "../interfaces/app.interfaces.js";

interface UserInput {
  name: string;
  balance: number;
};

interface User extends ID, UserInput {
  userSubscribedTo?: Subscription[];
  subscribedToUser?: Subscription[];
};

export type { UserInput, User };
