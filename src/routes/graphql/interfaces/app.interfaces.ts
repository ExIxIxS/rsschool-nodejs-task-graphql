import { PrismaClient } from "@prisma/client";
import { DataLoaders } from "./dataLoaders.interfaces.js";

interface ID {
  id: string;
};

interface Subscription {
  subscriberId: string;
  authorId: string;
};

interface SubscriptionMutationInput {
  userId: string;
  authorId: string;
};

type NoArgs = Record<string | number | symbol, never>;

interface Context extends DataLoaders {
  prisma: PrismaClient;
}

export { ID, Subscription, SubscriptionMutationInput, NoArgs, Context };
