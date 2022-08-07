import authRoutes from "./routes/auth/index";
import listRoutes from "./routes/list/index";
import isSubscribed from "./plugins/isSubscribed";
import isListExists from "./plugins/isListExists";
import prismaPlugin from "./plugins/prisma";
import jwtPlugin from "./plugins/jwt";
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

async function main() {

	fastify.register(jwtPlugin);
	fastify.register(prismaPlugin);
	fastify.register(isListExists);
	fastify.register(isSubscribed);
	fastify.register(authRoutes, { prefix: "/auth" });
	fastify.register(listRoutes, { prefix: "/list" });

	try {
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
}

main();
