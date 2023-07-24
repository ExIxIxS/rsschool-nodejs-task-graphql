import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';

import { queryType } from './types/query.types.js';
import { mutationType } from './types/mutation.types.js';

const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const gqlRequestSchema = new GraphQLSchema({ query: queryType, mutation: mutationType });

export { gqlRequestSchema, gqlResponseSchema, createGqlResponseSchema };
