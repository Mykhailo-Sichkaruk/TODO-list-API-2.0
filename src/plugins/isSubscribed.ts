import { FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { Request } from "..";

export default fp(async fastify => {
	fastify.decorate("isSubscribed", async (request: Request, reply: FastifyReply) => {
		let id;

		if (request.url.startsWith("/task") && request.method !== "POST") {
			id = request.task.listId;
		} else if (request.params.id) {
			id = request.params.id;
		}
		const subscriber = await fastify.prisma.list.findFirst({
			where: { id, subscribers: { some: { id: request.user.id } } },
			select: { id: true, title: true, authorId: true },
		});
		if (!subscriber)
			reply.code(403).send({ message: `You are not a subscriber of list {id:${id}}` });
	});
});
