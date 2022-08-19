import authRoutes from "./routes/auth/index.js";
import listRoutes from "./routes/list/index.js";
import errorHandler from "./plugins/errorHandler.js";
import isSubscribed from "./plugins/isSubscribed.js";
import isListExists from "./plugins/isListExists.js";
import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerOptions from "./plugins/swaggerDocs.js";
import { fastify, FastifyInstance } from "fastify";

const server: FastifyInstance = fastify({});

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
	server.swagger();
	console.log(server.printRoutes());
}

main();
try {
	await server.listen({ port: process.env.PORT as unknown as number, host: "0.0.0.0" });
} catch (err) {
	server.log.error(err);
	process.exit(1);
}
