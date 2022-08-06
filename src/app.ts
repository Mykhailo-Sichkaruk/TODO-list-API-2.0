import Fastify from "fastify";
import authRoutes from "./modules/auth/index";
import jwtPlugin from "./plugins/jwt";
import listRoutes from "./modules/list/index";

const fastify = Fastify({ logger: true });

async function main() {

	fastify.register(jwtPlugin);
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
