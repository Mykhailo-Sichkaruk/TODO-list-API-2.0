import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { postLogin, postRegister } from "./handler.js";
import schema from "./schema.js";

const loginOptions = {
	schema,
	handler: postLogin,
};

const registerOptions = {
	schema,
	handler: postRegister,
};

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.post("/login", loginOptions);
	fastify.post("/register", registerOptions);
};

export default authRoutes;
