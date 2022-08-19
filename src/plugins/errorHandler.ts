import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

function errorHandler(error: FastifyError, _request: FastifyRequest, reply: FastifyReply) {
	// Log error
	console.error(error);
	if (error.statusCode && error.statusCode < 500) {
		reply.code(error.statusCode).send({ message: error.message });
	} else {
		// Send error response		
		reply.status(500).send({ message: "Something went wrong on the server" });
	}

}

export default errorHandler;
