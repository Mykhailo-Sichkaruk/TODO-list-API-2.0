import { FastifyPluginAsync } from "fastify";
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

const authRoutes: FastifyPluginAsync = async fastify => {
	fastify.post("/login", loginOptions);
	fastify.post("/register", registerOptions);
};

export default authRoutes;
