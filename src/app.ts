import Fastify from "fastify";
import listRoutes from "./modules/list/list.routes";
import prismaPlugin from "./plugins/prisma";

const server = Fastify();

server.get("/healthcheck", (request, reply) => {
	reply.send({ status: "ok" });
});

async function main() {

	server.register(prismaPlugin);
	server.register(listRoutes, { prefix: "/list" });

	try {
		await server.listen({ port: 3000, host: "0.0.0.0" });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
}

main();
