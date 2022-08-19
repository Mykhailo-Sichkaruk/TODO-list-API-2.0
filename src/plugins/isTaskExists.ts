import { FastifyInstance, FastifyReply } from "fastify";
import * as fp from "fastify-plugin";
import { Server } from "https";
import { Request } from "./prisma.js";

declare module "fastify"{
	interface FastifyRequest{
		task: {
			title: string;
            listId: string;
            authorId: string;
		}
	}
	interface FastifyInstance{
		isTaskExists(request: FastifyRequest, reply: FastifyReply): Promise<void>;
	}
}

export default fp.default<Server>(async (fastify: FastifyInstance) => {
	fastify.decorateRequest("task", null);
	fastify.decorate("isTaskExists", async (request: Request, reply: FastifyReply) => {
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
