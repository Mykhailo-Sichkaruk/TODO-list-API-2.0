import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postTaskHandler = async (request, reply) => {
	const { listId, title, body, deadline, status } = request.body;
	// Check if list exists
	const list = await prisma.list.findUnique({ where: { id: listId } });
	if (!list)
		return reply.code(404).send({ message: "List not found" });
	// Check if user is subscribed to List
	const isSubscribed = await prisma.list.findFirst({ where: { id: listId, subscribers: { some: { id: request.user.id as string } } } });
	if (!isSubscribed)
		return reply.code(403).send({ message: "You are not subscribed to this list" });
	// Create Task
	const task = await prisma.task.create({
		data: {
			title,
			body,
			deadline,
			status,
			author: { connect: { id: request.user.id } },
			list: { connect: { id: listId } },
		} });
	return reply.code(200).send(task);
};


export { postTaskHandler };
