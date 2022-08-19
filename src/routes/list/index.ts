import { FastifyInstance, FastifyPluginAsync, FastifyReply } from "fastify";
import { Request } from "../../plugins/prisma.js";
import { deleteListOptions, getAllListsOptions, getOneListOptions, postListOptions, putListOptions, subscribeToListOptions } from "./options.js";

const listRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.addHook("onRequest", async (request: Request, reply: FastifyReply) => {
		await fastify.authenticate(request, reply);
		await fastify.isListExists(request, reply);
	});

	fastify.get("", getAllListsOptions);
	fastify.get("/:id", getOneListOptions);
	fastify.post("", postListOptions);
	fastify.register(async (fastify: FastifyInstance)  => {
		fastify.addHook("onRequest", async (request: Request, reply: FastifyReply) => {
			await fastify.isSubscribed(request, reply);
		});
		fastify.post("/:id/subscribe", subscribeToListOptions);
		fastify.delete("/:id", deleteListOptions);
		fastify.put("/:id", putListOptions);
	});
};

export default listRoutes;
