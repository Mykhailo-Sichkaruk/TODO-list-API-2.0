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

fastify.register(fastifySwagger, fastifySwaggerOptions);

fastify.setErrorHandler(errorHandler);
fastify.register(jwtPlugin);
fastify.register(prismaPlugin);
fastify.register(isListExists);
fastify.register(isSubscribed);
fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(listRoutes, { prefix: "/list" });
fastify.ready();
fastify.swagger();

try {
	fastify.listen({ port: process.env.PORT as unknown as number, host: "0.0.0.0" });
	console.log(fastify.printRoutes());
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
