import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

export default fp(async fastify => {
	const prisma = new PrismaClient({
		log: ["error", "warn"],
	});

	await prisma.$connect();

	fastify.decorateRequest("prisma", prisma);
	fastify.decorate("prisma", prisma);

	fastify.addHook("onClose", async server => {
		server.log.info("disconnecting Prisma from DB");
		await server.prisma.$disconnect();
	});
});
