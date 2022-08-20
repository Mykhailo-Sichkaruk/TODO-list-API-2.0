import { FastifyPluginAsync } from "fastify";
import * as options from "./options.js";

const listRoutes: FastifyPluginAsync = async fastify => {
	// All requests in this scope must be authenticated and list must exist
	fastify.addHook("onRequest", async (request, reply) => {
		await fastify.authenticate(request, reply);
		await fastify.isListExists(request, reply);
	});

	fastify.get("", options.getAll);
	fastify.get("/:id", options.getOne);
	fastify.post("", options.post);
	fastify.register(async fastify  => {
		// All requests in this scope must be sent by a subscriber of the list
		fastify.addHook("onRequest", async (request, reply) => {
			await fastify.isSubscribed(request, reply);
		});
		fastify.post("/:id/subscribe", options.subscribe);
		fastify.delete("/:id", options.deleteO);
		fastify.put("/:id", options.put);
	});
};

export default listRoutes;
