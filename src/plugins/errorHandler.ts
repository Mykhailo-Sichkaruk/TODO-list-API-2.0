function errorHandler(error, request, reply) {
	// Log error
	this.log.error(error);
	// Send error response
	reply.status(500).send({ message: "Something went wrong on the server" });
}

export default errorHandler;
