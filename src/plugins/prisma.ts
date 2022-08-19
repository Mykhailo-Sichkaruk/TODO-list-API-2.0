import { FastifyRequest } from "fastify";
import { PrismaClient, Status } from "@prisma/client";
import { Server } from "http";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export type Request = FastifyRequest<{
	Body: {
		id: string,
		title: string,
		subscriberId: string,
		listId: string,
		body: string,
		deadline: string,
		status: Status,
		login: string,
		password: string,
	};
	Params: {
		id: string;
	}
}>


export default fp<Server>(async fastify => {
	const prisma = new PrismaClient({
		log: ["error", "warn"],
	});

	await prisma.$connect();

	fastify.decorate("prisma", prisma);

	fastify.addHook("onClose", async server => {
		server.log.info("disconnecting Prisma from DB");
		await server.prisma.$disconnect();
	});
});
