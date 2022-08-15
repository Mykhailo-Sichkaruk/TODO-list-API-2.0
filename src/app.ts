import authRoutes from "./routes/auth/index.js";
import listRoutes from "./routes/list/index.js";
import errorHandler from "./plugins/errorHandler.js";
import isSubscribed from "./plugins/isSubscribed.js";
import isListExists from "./plugins/isListExists.js";
import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerOptions from "./plugins/swaggerDocs.js";
import fastify from "fastify";

declare module "fastify" {
 interface FastifyRequest {
    list?: {
      id: string;
      title: string;
      authorId: string;
    } | null;
    }
  interface FastifyInstance {
    isListExists(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    isSubscribed(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}


const server: fastify.FastifyInstance = fastify({});

async function main() {
	server.setErrorHandler(errorHandler);
	await server.register(fastifySwagger, fastifySwaggerOptions);
	await server.register(jwtPlugin);
	await server.register(prismaPlugin);
	await server.register(isListExists);
	await server.register(isSubscribed);
	await server.register(authRoutes, { prefix: "/auth" });
	await server.register(listRoutes, { prefix: "/list" });
	await server.ready();
	await server.swagger();
	console.log(server.printRoutes());

	return server;
}

main();
try {
	server.listen({ port: process.env.PORT as unknown as number, host: "0.0.0.0" });
} catch (err) {
	server.log.error(err);
	process.exit(1);
}
