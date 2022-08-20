import { FastifyInstance, FastifyPluginAsync, FastifyReply } from "fastify";
import { Request } from "../../plugins/prisma.js";
import * as options from "./options.js";

const listRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.addHook("onRequest", async (request: Request, reply: FastifyReply) => {
		await fastify.authenticate(request, reply);
		await fastify.isListExists(request, reply);
	});

	fastify.get("", options.getAll);
	fastify.get("/:id", options.getOne);
	fastify.post("", options.post);
	fastify.register(async (fastify: FastifyInstance)  => {
		fastify.addHook("onRequest", async (request: Request, reply: FastifyReply) => {
			await fastify.isSubscribed(request, reply);
		});
		fastify.post("/:id/subscribe", options.subscribe);
		fastify.delete("/:id", options.deleteO);
		fastify.put("/:id", options.put);
	});
};

export default listRoutes;
