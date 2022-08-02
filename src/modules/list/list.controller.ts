import { FastifyReply, FastifyRequest } from "fastify";

async function createList(
	request: FastifyRequest,
	reply: FastifyReply
) {
	console.log("createList");
	reply.send({ status: "ok" });
}

export { createList };
