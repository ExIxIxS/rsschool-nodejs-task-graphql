import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';

import { createGqlResponseSchema, gqlRequestSchema, gqlResponseSchema } from './schemas.js';
import { getDataLoaders } from './getDataLoaders.js';
import { getAllRestHandlers } from './restHandlers/restHandlers.js';
import depthLimit from 'graphql-depth-limit';

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
      const errors = validate(gqlRequestSchema, parse(req.body.query), [depthLimit(5)]);

      if (errors.length) {
        return { errors };
      };

      const prisma = fastify.prisma;

      const response = await graphql({
        schema: gqlRequestSchema,
        source: req.body.query,
        rootValue: getAllRestHandlers(),
        variableValues: req.body.variables,
        contextValue: { prisma: prisma, ...getDataLoaders(prisma) }
      });
      return response;
    },
  });
};

export default plugin;
