import { PostTask, PostTaskData, Route } from "../../index.js";

const post: Route = async (request, reply) => {
	const { listId } = request.body as PostTask;
	// Create Task
	const task = await request.prisma.task.create({
		data: {
			...request.data as PostTaskData,
			author: { connect: { id: request.user.id } },
			list: { connect: { id: listId } },
		} });
	reply.code(200).send({ message: `Task {${task.title}} successfully created.`, task });
};

const put: Route = async (request, reply) => {
	const { id } = request.params;
	// Update Task
	const task = await request.prisma.task.update({
		where: { id },
		data: {	...request.data },
		select: { id: true, authorId: true, listId: true, title: true, status: true, body: true, deadline: true },
	});
	reply.code(200).send({ message: `Task ${task.id} was successfully updated`, task });
};

const deleteT: Route = async (request, reply) => {
	const { id } = request.params;
	await request.prisma.task.delete({ where: { id } });
	reply.code(200).send({ message: "Task deleted" });
};

export { post, put, deleteT };
