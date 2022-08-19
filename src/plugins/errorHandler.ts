import { FastifyReply, FastifyRequest } from "fastify";

function errorHandler(error: Error, _request: FastifyRequest, reply: FastifyReply) {
	// Log error
	console.error(error);
	// Send error response
	reply.status(500).send({ message: "Something went wrong on the server" });
}

export default errorHandler;
