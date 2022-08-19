import { FastifyReply } from "fastify";
import { PrismaClient, Status } from "@prisma/client";
import { Request } from "../../plugins/prisma.js";

const prisma = new PrismaClient();

const postTaskHandler = async (request: Request, reply: FastifyReply) => {
	const { listId, title, body, status } = request.body as { listId: string, title: string, body: string, deadline: string, status: Status };
	let { deadline } = request.body;
	// Check if list exists
	const list = await prisma.list.findUnique({ where: { id: listId }, select: { id: true, title: true, authorId: true } });
	if (!list) {
		reply.code(404).send({ message: `List with id:${listId} doesn't exist` });
		return;
	}
	// Check deadline
	try {
		deadline = checkDeadline(deadline);
	} catch (error: any) {
		reply.code(400).send({ message: error.message });
		return;
	}
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
	reply.code(200).send(task);
};

const putTaskHandler = async (request: Request, reply: FastifyReply) => {
	const { id, title, body, status } = request.body;
	let { deadline } = request.body;
	// Check deadline
	if (deadline) {
		try {
			deadline = checkDeadline(deadline);
		} catch (error: any) {
			reply.code(400).send({ message: error.message });
			return;
		}
	}
	// Update Task
	const updatedTask = await prisma.task.update({
		where: { id },
		data: {
			title,
			deadline,
			body,
			status,
		} });
	return reply.code(200).send(updatedTask);
};

const deleteTaskHandler = async (request: Request, reply: FastifyReply) => {
	const { id } = request.params;
	await prisma.task.delete({ where: { id } });
	return reply.code(200).send({ message: "Task deleted" });
};

function checkDeadline(value: string | number | Date | undefined): Date {
	if (!value) { // Create owt deadline if not provided
		const day = 1000 * 60 * 60 * 24; // 1000 ms * 60 s * 60 min * 24 h
		return new Date(Date.now() + day); // 1 day from now
	} else if (value instanceof Date) { // If deadline is a Date object, return it
		return value;
	}
	const date = new Date(value); // If deadline is a string, convert it to Date object
	if (date.getTime() > Date.now()) { // If deadline is in the future, return it
		return date;
	}
	throw new Error("Deadline must be in Date format and be in the future"); // If deadline is in the past, throw an error
}

export { postTaskHandler, putTaskHandler, deleteTaskHandler };
