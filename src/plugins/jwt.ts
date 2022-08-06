import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

const jwtPlugin = fp(async fastify => {
	fastify.register(fastifyJwt, {
		secret: "supersecret",
	});

	fastify.decorate("authenticate", async (request, reply) => {
		request.jwtVerify()
			.then(user => { request.user = user; })
			.catch(err => { reply.code(401).send({ message: err.message }); });
	});
});

export default jwtPlugin;
