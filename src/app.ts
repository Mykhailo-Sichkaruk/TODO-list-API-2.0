import authRoutes from "./routes/auth/index";
import listRoutes from "./routes/list/index";
import errorHandler from "./plugins/errorHandler";
import isSubscribed from "./plugins/isSubscribed";
import isListExists from "./plugins/isListExists";
import prismaPlugin from "./plugins/prisma";
import jwtPlugin from "./plugins/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerOptions from "./plugins/swaggerDocs";
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

async function main() {
	await fastify.register(fastifySwagger, fastifySwaggerOptions);

	fastify.setErrorHandler(errorHandler);
	await fastify.register(jwtPlugin);
	await fastify.register(prismaPlugin);
	await fastify.register(isListExists);
	await fastify.register(isSubscribed);
	await fastify.register(authRoutes, { prefix: "/auth" });
	await fastify.register(listRoutes, { prefix: "/list" });
	await fastify.ready();
	fastify.swagger();

	try {
		fastify.listen({ port: process.env.PORT as unknown as number, host: "0.0.0.0" });
		console.log(fastify.printRoutes());
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
}

main();
