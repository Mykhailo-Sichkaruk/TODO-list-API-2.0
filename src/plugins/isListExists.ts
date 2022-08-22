import { FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { Request } from "..";

export default fp(async fastify => {
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
