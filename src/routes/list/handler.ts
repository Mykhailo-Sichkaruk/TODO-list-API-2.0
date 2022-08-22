import { Route } from "../../";

const post: Route = async (request, reply) => {
	const { title } = request.body as { title: string };
	const authorId = request.user.id;
	const list = await request.prisma.list.create({
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
	await request.prisma.list.update({ where: { id }, data: { tasks: { deleteMany: {} } } });
	await request.prisma.list.delete({ where: { id } });
	reply.code(200).send({ message: `List ${request.list.title} id:${request.list.id} successfully deleted` });
};

const put: Route = async (request, reply) => {
	const { id } = request.params;
	const { title } = request.body;
	const updatedList = await request.prisma.list.update({
		where: { id },
		data: { title },
	});
	reply.code(200).send({ message: `List ${request.list.title} id:${request.list.id} successfully updated`, list: updatedList });
};

const getOne: Route = async (request, reply) => reply.code(200).send({ list: request.list });

const getAll: Route = async (request, reply) => {
	// Get all lists
	const lists = await request.prisma.list.findMany({
		where: { subscribers: { some: { id: request.user.id } } },
		include: { tasks: {
			select: {
				id: true,
				status: true,
				body: true,
				title: true,
				deadline: true,
			},
			orderBy: { deadline: "asc" },
		} },
	});
	reply.code(200).send(lists);
};

const subscribe: Route = async (request, reply) => {
	const { id } = request.params;
	const { subscriberId } = request.body;
	// Check if subscriber is real user
	const subscriber = await request.prisma.user.findUnique({ where: { id: subscriberId } });
	if (!subscriber)
		return reply.code(400).send({ message: "Subscriber not found" });
	// Subscribe user to list
	await request.prisma.list.update({
		where: { id },
		data: { subscribers: { connect: { id: subscriberId } } },
	});
	reply.code(200).send({ message: `User ${subscriberId} successfully subscribed to ${request.list.title}(${request.list.id})` });
};

export { post, deleteL, put, getOne, getAll, subscribe };
