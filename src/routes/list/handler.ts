import { PrismaClient } from "@prisma/client";
import { Route } from "../../index.js";

const prisma = new PrismaClient();

const post: Route = async (request, reply) => {
	const { title } = request.body;
	const authorId = request.user.id;
	const list = await prisma.list.create({
		data: {
			title,
			authorId,
			subscribers: { connect: { id: authorId } },
		},
	});
	reply.code(200).send(list);
};

const deleteL: Route = async (request, reply) => {
	const { id } = request.params;
	// Check if user is author
	if (request.list.authorId !== request.user.id)
		return reply.code(403).send({ message: "You are not the author of this List to delete it" });
		// Delete list
	await prisma.list.delete({ where: { id } });
	reply.code(200).send({ message: `List ${request.list.title} id:${request.list.id} successfully deleted` });
};

const put: Route = async (request, reply) => {
	const { id } = request.params;
	const { title } = request.body;
	const updatedList = await prisma.list.update({
		where: { id },
		data: { title },
	});
	reply.code(200).send({ message: `List ${request.list.title} id:${request.list.id} successfully updated`, list: updatedList });
};

const getOne: Route = async (request, reply) => reply.code(200).send({ list: request.list });

const getAll: Route = async (request, reply) => {
	// Get all lists
	const lists = await prisma.list.findMany({
		where: { subscribers: { some: { id: request.user.id } } },
		include: { tasks: true },
	});
	reply.code(200).send(lists);
};

const subscribe: Route = async (request, reply) => {
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
	reply.code(200).send({ message: `User ${subscriberId} successfully subscribed to ${request.list.title}(${request.list.id})` });
};

export { post, deleteL, put, getOne, getAll, subscribe };
