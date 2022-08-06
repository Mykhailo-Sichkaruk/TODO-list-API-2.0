import { DoneFuncWithErrOrRes, FastifyInstance, RouteOptions } from "fastify";
import { deleteListSchema, postListSchema, putListSchema } from "./chema";
import { deleteList, getAllLists, getOneList, postList, putList } from "./handler";

const postListOptions = {
	schema: postListSchema,
	handler: postList,
};

const deleteListOptions = {
	schema: deleteListSchema,
	handler: deleteList,
};

const putListOptions = {
	schema: putListSchema,
	handler: putList,
};

const listRoutes = (fastify: FastifyInstance, _options: RouteOptions, done: DoneFuncWithErrOrRes) => {
	fastify.addHook("onRequest", async (request, reply) => {
		fastify.authenticate(request, reply);
	});

	fastify.post("", postListOptions);
	fastify.delete("/:id", deleteListOptions);
	fastify.put("/:id", putListOptions);
	fastify.get("/:id", getOneList);
	fastify.get("", getAllLists);

	done();
};

export default listRoutes;
