import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';

import { createGqlResponseSchema, gqlRequestSchema, gqlResponseSchema } from './schemas.js';
import { getDataLoaders } from './getDataLoaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const prisma = fastify.prisma;

      const response = await graphql({
        schema: gqlRequestSchema,
        source: req.body.query,
        rootValue: {},
        variableValues: req.body.variables,
        contextValue: { prisma: prisma, ...getDataLoaders(prisma) }
      });
      return response;
    },
  });
};

export default plugin;
