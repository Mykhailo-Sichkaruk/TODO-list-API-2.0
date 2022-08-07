import { DoneFuncWithErrOrRes, FastifyInstance, RouteOptions } from "fastify";
import { deleteListOptions, getAllListsOptions, getOneListOptions, postListOptions, putListOptions, subscribeToListOptions } from "./options";

const listRoutes = (fastify: FastifyInstance, _options: RouteOptions, done: DoneFuncWithErrOrRes) => {
	fastify.addHook("onRequest", async (request, reply) => {
		await fastify.authenticate(request, reply);
		await fastify.isListExists(request, reply);
	});

	fastify.get("", getAllListsOptions);
	fastify.get("/:id", getOneListOptions);
	fastify.register(async (fastify, _options, done) => {
		fastify.addHook("onRequest", async (request, reply) => {
			await fastify.isSubscribed(request, reply);
		});
		fastify.post("/:id/subscribe", subscribeToListOptions);
		fastify.delete("/:id", deleteListOptions);
		fastify.put("/:id", putListOptions);
		fastify.post("", postListOptions);
		done();
	});

	done();
};

export default listRoutes;
