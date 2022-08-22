import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { TokenObject } from "..";

export default fp<FastifyJWTOptions>(async fastify => {
	fastify.register(fastifyJwt, {
		secret: "supersecret",
		sign: {
			expiresIn: "1h",
		},
	});

	fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply):Promise<void> => {
		request.jwtVerify<TokenObject>()
			.then(user => { request.user = user; })
			.catch(err => { reply.code(401).send({ message: err.message }); });
	});
});


