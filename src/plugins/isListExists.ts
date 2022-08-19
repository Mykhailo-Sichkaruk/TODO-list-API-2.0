import { FastifyInstance, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { Server } from "https";
import { Request } from "./prisma.js";

declare module "fastify"{
	interface FastifyRequest{
		list: {
			id: string;
			title: string;
			authorId: string;
		}
	}
	interface FastifyInstance{
		isListExists(request: FastifyRequest, reply: FastifyReply): Promise<void>;
	}
}

export default fp<Server>(async (fastify: FastifyInstance) => {
	fastify.decorateRequest("list", null);
	fastify.decorate("isListExists", async (request: Request, reply: FastifyReply) => {
		if (request.params.id) {
			const list = await fastify.prisma.list.findUnique({ where: { id: request.params.id }, select: { id: true, title: true, authorId: true } });
			if (!list) {
				reply.code(404).send({ message: `List with id:${request.params.id} doesn't exist` });
				return;
			}
			request.list = list;
		} else if (request.params.id === "") {
			reply.code(400).send({ message: "List id is required" });
		}
	});
});
