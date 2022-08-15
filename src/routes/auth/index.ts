import { DoneFuncWithErrOrRes, FastifyInstance, RouteOptions } from "fastify";
import { postLogin, postRegister } from "./handler.js";
import { authSchema } from "./schema.js";

const loginOptions = {
	schema: authSchema,
	handler: postLogin,
};

const registerOptions = {
	schema: authSchema,
	handler: postRegister,
};

const authRoutes = (fastify: FastifyInstance, _options: RouteOptions, done: DoneFuncWithErrOrRes) => {
	fastify.post("/login", loginOptions);
	fastify.post("/register", registerOptions);
	done();
};

export default authRoutes;
