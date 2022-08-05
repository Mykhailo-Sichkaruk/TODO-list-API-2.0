import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import authRoutes from "./modules/auth/index";
import fastifyJwt from "@fastify/jwt";

const fastify = Fastify({ logger: true });

fastify.get("/healthcheck", (request, reply) => {
	reply.send({ status: "ok" });
});

async function main() {

	fastify.register(prismaPlugin);
	fastify.register(fastifyJwt, {
		secret: "secret",
		sign: {
			expiresIn: "1d",
		},
	});
	fastify.register(authRoutes, { prefix: "/auth" });

	try {
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
}

main();
