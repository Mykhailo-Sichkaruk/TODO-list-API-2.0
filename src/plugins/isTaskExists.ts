import fp from "fastify-plugin";
import { Route } from "..";

export default fp(async fastify => {
	fastify.decorateRequest("task", null);
	fastify.decorate<Route>("isTaskExists", async (request, reply) => {
		if (request.params.id && request.method !== "POST") {
			const task = await fastify.prisma.task.findUnique({ where: { id: request.params.id }, select: { id: true, title: true, authorId: true, listId: true } });
			if (!task) {
				reply.code(404).send({ message: `Task with id:${request.params.id} doesn't exist` });
				return;
			}
			request.task = task;
		} else if (request.params.id === "") {
			reply.code(400).send({ message: "Task id is required" });
		}
	});
});
