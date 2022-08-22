import { FastifyPluginAsync } from "fastify";
import { Request } from "../../plugins/prisma.js";
import * as options from "./options.js";

const taskRoutes: FastifyPluginAsync = async fastify => {
	// All requests in this scope must be authenticated, task must exist and user must be a subscriber of the list
	fastify.addHook("onRequest", async (request, reply) => {
		await fastify.authenticate(request, reply);
		await fastify.isTaskExists(request, reply);
		await fastify.isSubscribed(request, reply);
	});

	fastify.delete("/:id", options.deleteO);
	fastify.register(async fastify => {
		// All ruquests in this scope has extra validation
		fastify.addHook("preHandler", async (request: Request, reply) => {
			request.taskValidator(request, reply);
		});
		fastify.post("", options.post);
		fastify.put("/:id", options.put);
	});
};

export default taskRoutes;
