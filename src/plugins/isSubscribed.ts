import fp from "fastify-plugin";

const isSubscribed = fp(async fastify => {
	fastify.decorate("isSubscribed", async (request, reply) => {
		const subscriber = await fastify.prisma.list.findFirst({
			where: { id: request.params.id, subscribers: { some: { id: request.user.id } } },
			select: { id: true, title: true, authorId: true } });
		if (!subscriber)
			return reply.code(403).send({ message: "You are not a subscriber of this list" });
	});
});

export default isSubscribed;
