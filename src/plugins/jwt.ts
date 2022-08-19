import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

type TokenObject = {
	id: string;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: TokenObject
    user: TokenObject
  }
}

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

export default fp<FastifyJWTOptions>(async (fastify: FastifyInstance) => {
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


