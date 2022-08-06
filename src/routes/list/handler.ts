import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postList = async (request: FastifyRequest<any>, reply: FastifyReply<any>) => {
	const { title } = request.body;
	const authorId = request.user.id;
	try {
		const list = await prisma.list.create({
			data: {
				title,
				authorId,
				subscribers: { connect: { id: authorId } },
			},
		});
		return reply.code(200).send(list);
	} catch (err) {
		reply.code(500).send({ message: "Something went wrong on the server" });
	}
};

const deleteList = async (request: FastifyRequest<any>, reply: FastifyReply<any>) => {
	const { id } = request.params;
	try {
		// Check if list exists
		const list = await prisma.list.findUnique({ where: { id } });
		if (!list)
			return reply.code(404).send({ message: "List doesn't exist" });
		// Check if user is author
		if (list.authorId !== request.user.id)
			return reply.code(403).send({ message: "You are not the author of this List to delete List" });
		// Delete list
		await prisma.list.delete({ where: { id } });
		return reply.code(200).send({ message: `${list.title}(${list.id}) successfully deleted` });
	} catch (err) {
		reply.code(500).send({ message: "Something went wrong on the server" });
	}
};

const putList = async (request: FastifyRequest<any>, reply: FastifyReply<any>) => {
	const { id } = request.params;
	const { title } = request.body;
	try {
		// Check if list exists
		const list = await prisma.list.findUnique({ where: { id } });
		if (!list)
			return reply.code(404).send({ message: "List doesn't exist" });
		// Check if user is subscriber
		const subscriber = await prisma.list.findFirst({
			where: {
				id,
				subscribers: { some: { id: request.user.id } },
			} });
		if (!subscriber)
			return reply.code(403).send({ message: "You are not a subscriber of this list" });
		// Update list
		await prisma.list.update({
			where: { id },
			data: { title },
		});
		return reply.code(200).send({ message: `${list.title}(${list.id}) successfully updated`, list });
	} catch (err) {
		reply.code(500).send({ message: "Something went wrong on the server" });
	}
};

const getOneList = async (request: FastifyRequest<any>, reply: FastifyReply<any>) => {
	const { id } = request.params;
	try {
		// Check if list exists
		const list = await prisma.list.findUnique({ where: { id } });
		if (!list)
			return reply.code(404).send({ message: "List doesn't exist" });
		// Send list
		return reply.code(200).send(list);
	} catch (err) {
		reply.code(500).send({ message: "Something went wrong on the server" });
	}
};

const getAllLists = async (request: FastifyRequest<any>, reply: FastifyReply<any>) => {
	try {
		// Get all lists
		const lists = await prisma.list.findMany({
			where: { subscribers: { some: { id: request.user.id } } },
		});
		return reply.code(200).send(lists);
	} catch (err) {
		reply.code(500).send({ message: "Something went wrong on the server" });
	}
};

export { postList, deleteList, putList, getOneList, getAllLists };
