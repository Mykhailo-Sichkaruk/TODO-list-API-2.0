import { PrismaClient } from "@prisma/client";
import { FastifyReply } from "fastify";
import { Request } from "../../plugins/prisma.js";

const prisma = new PrismaClient();

const post = async (request: Request, reply: FastifyReply<any>) => {
	const { title } = request.body;
	const authorId = request.user.id;
	const list = await prisma.list.create({
		data: {
			title,
			authorId,
			subscribers: { connect: { id: authorId } },
		},
	});
	return reply.code(200).send(list);
};

const deleteL = async (request: Request, reply: FastifyReply<any>) => {
	const { id } = request.params;
	// Check if user is author
	if (request.list.authorId !== request.user.id)
		return reply.code(403).send({ message: "You are not the author of this List to delete it" });
		// Delete list
	await prisma.list.delete({ where: { id } });
	return reply.code(200).send({ message: `List ${request.list.title} id:${request.list.id} successfully deleted` });
};

const put = async (request: Request, reply: FastifyReply) => {
	const { id } = request.params;
	const { title } = request.body;
	const updatedList = await prisma.list.update({
		where: { id },
		data: { title },
	});
	return reply.code(200).send({ message: `List ${request.list.title} id:${request.list.id} successfully updated`, list: updatedList });
};

const getOne = async (request: Request, reply: FastifyReply<any>) => reply.code(200).send({ list: request.list });

const getAll = async (request: Request, reply: FastifyReply) => {
	// Get all lists
	const lists = await prisma.list.findMany({
		where: { subscribers: { some: { id: request.user.id } } },
		include: { tasks: true },
	});
	return reply.code(200).send(lists);
};

const subscribe = async (request: Request, reply: FastifyReply) => {
	const { id } = request.params;
	const { subscriberId } = request.body;
	// Check if subscriber is already subscribed
	const isSubscribed = await prisma.list.findFirst({
		where: {
			id,
			subscribers: { some: { id: subscriberId } },
		} });
	if (isSubscribed)
		return reply.code(403).send({ message: "This user is already subscribed to this list" });
		// Subscribe to list
	await prisma.list.update({
		where: { id },
		data: { subscribers: { connect: { id: subscriberId } } },
	});
	return reply.code(200).send({ message: `User ${subscriberId}${request.list.title}(${request.list.id}) successfully subscribed to` });
};

export { post, deleteL, put, getOne, getAll, subscribe };
