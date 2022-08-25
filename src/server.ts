import errorHandler from "./plugins/errorHandler.js";
import isSubscribed from "./plugins/isSubscribed.js";
import isListExists from "./plugins/isListExists.js";
import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerOptions from "./plugins/swaggerDocs.js";
import { fastify, FastifyServerOptions } from "fastify";
import isTaskExists from "./plugins/isTaskExists.js";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import taskValidator from "./plugins/taskValidator.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function startServer(options : FastifyServerOptions = {}) {
	const server = fastify(options);
	server.setErrorHandler(errorHandler);
	server.register(fastifySwagger, fastifySwaggerOptions);
	server.register(jwtPlugin);
	server.register(prismaPlugin);
	server.register(isListExists);
	server.register(isSubscribed);
	server.register(isTaskExists);
	server.register(taskValidator);
	server.register(autoLoad, {
		dir: path.join(__dirname, "routes"),
		forceESM: true,
	});
	await server.ready();
	return server;
}

export default startServer;
