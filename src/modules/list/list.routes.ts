import { FastifyInstance } from "fastify";
import { createList } from "./list.controller";

async function listRoutes(server: FastifyInstance) {
	console.log("listRoutes");
	server.post("/", createList);
}

export default listRoutes;
