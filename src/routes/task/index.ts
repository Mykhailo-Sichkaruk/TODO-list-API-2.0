import { DoneFuncWithErrOrRes, FastifyInstance, RouteOptions } from "fastify";
import { postTaskOptions } from "./options.js";

const taskRoutes = (fastify: FastifyInstance, _options: RouteOptions, done: DoneFuncWithErrOrRes) => {
	fastify.post("", postTaskOptions);
	done();
};

export default taskRoutes;
