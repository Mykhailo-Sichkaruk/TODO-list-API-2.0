import { FastifyPluginAsync } from "fastify";
import * as options from "./options.js";

const taskRoutes: FastifyPluginAsync = async fastify => {
	// All requests in this scope must be authenticated, task must exist and user must be a subscriber of the list
	fastify.addHook("onRequest", async (request, reply) => {
		await fastify.authenticate(request, reply);
		await fastify.isTaskExists(request, reply);
		await fastify.isSubscribed(request, reply);
	});

	fastify.post("", options.post);
	fastify.put("/:id", options.put);
	fastify.delete("/:id", options.deleteO);
};

export default taskRoutes;
