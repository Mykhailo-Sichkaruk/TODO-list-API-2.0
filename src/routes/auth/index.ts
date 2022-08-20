import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { loginOptions, registerOptions } from "./options";

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.post("/login", loginOptions);
	fastify.post("/register", registerOptions);
};

export default authRoutes;
