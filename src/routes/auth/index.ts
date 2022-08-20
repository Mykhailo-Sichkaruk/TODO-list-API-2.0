import { FastifyInstance, FastifyPluginAsync } from "fastify";
import * as options from "./options";

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.post("/login", options.login);
	fastify.post("/register", options.register);
};

export default authRoutes;
