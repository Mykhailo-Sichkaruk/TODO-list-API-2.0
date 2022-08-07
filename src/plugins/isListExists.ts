import fp from "fastify-plugin";

const isListExists = fp(async fastify => {
	fastify.decorateRequest("list", null);
	fastify.decorate("isListExists", async (request, reply) => {
		if (request.params.id) {
			const list = await fastify.prisma.list.findUnique({ where: { id: request.params.id }, select: { id: true, title: true, authorId: true } });
			if (!list)
				return reply.code(404).send({ message: `List with id:${request.params.id} doesn't exist` });
			return request.list = list;
		} else if (request.params.id === "") {
			return reply.code(400).send({ message: "List id is required" });
		}
	});
});

export default isListExists;
