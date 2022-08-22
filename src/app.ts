import errorHandler from "./plugins/errorHandler.js";
import isSubscribed from "./plugins/isSubscribed.js";
import isListExists from "./plugins/isListExists.js";
import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerOptions from "./plugins/swaggerDocs.js";
import { fastify } from "fastify";
import fastifyOptions from "./plugins/fastifyOptions.js";
import isTaskExists from "./plugins/isTaskExists.js";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import taskValidator from "./plugins/taskValidator.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = fastify(fastifyOptions);

async function main() {
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
	console.log(server.printRoutes());
	server.swagger();
}

main();

try {
	await server.listen({ port: process.env.PORT as unknown as number, host: "0.0.0.0" });
} catch (err) {
	server.log.error(err);
	process.exit(1);
}
