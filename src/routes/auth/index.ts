import { FastifyPluginAsync } from "fastify";
import * as options from "./options.js";

const authRoutes: FastifyPluginAsync = async fastify => {
	fastify.post("/login", options.login);
	fastify.post("/register", options.register);
};

export default authRoutes;
