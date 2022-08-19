import { FastifyInstance, FastifyReply } from "fastify";
import { Server } from "http";
import { Request } from "./prisma";
import fp from "fastify-plugin";

declare module "fastify" {
interface FastifyInstance {
	isSubscribed: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}

export default fp<Server>(async (fastify: FastifyInstance) => {
	fastify.decorate("isSubscribed", async (request: Request, reply: FastifyReply) => {
		const subscriber = await fastify.prisma.list.findFirst({
			where: { id: request.params.id, subscribers: { some: { id: request.user.id } } },
			select: { id: true, title: true, authorId: true } });
		if (!subscriber)
			reply.code(403).send({ message: "You are not a subscriber of this list" });
	});
});
