import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { deleteTaskOptions, postTaskOptions, putTaskOptions } from "./options.js";

const taskRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	// All requests in this scope must be authenticated and the user must be a subscriber of the list of the task 
	fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
		await fastify.authenticate(request, reply);
		await fastify.isTaskExists(request, reply);
		await fastify.isSubscribed(request, reply);
	});

	fastify.post("", postTaskOptions);
	fastify.put("/:id", putTaskOptions);
	fastify.delete("/:id", deleteTaskOptions);
};

export default taskRoutes;
