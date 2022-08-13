import { DoneFuncWithErrOrRes, FastifyInstance, RouteOptions } from "fastify";
import { postTaskOptions } from "./options";

const taskRoutes = (fastify: FastifyInstance, _options: RouteOptions, done: DoneFuncWithErrOrRes) => {
	fastify.post("", postTaskOptions);
	done();
};

export default taskRoutes;
