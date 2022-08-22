import fp from "fastify-plugin";
import { Route, taskData } from "..";

type ValidateDeadline = (deadline: string | Date | number | undefined) => Date | undefined;

const validateDeadline: ValidateDeadline = value => {
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
	return undefined;
};

const taskValidator: Route = async (request, reply) => {
	const { title, body, status } = request.body;
	let { deadline } = request.body;
	// Check deadline
	deadline = validateDeadline(deadline);
	if (!deadline)
		return reply.code(400).send({ message: "Deadline is not valid, it must be empty or valid Date" });

	const data: taskData = {};
	if (title) data.title = title;
	if (body) data.body = body;
	if (deadline) data.deadline = deadline;
	if (status) data.status = status;
	request.data = data;
};

export default fp(async fastify => {
	fastify.decorateRequest("data", null);
	fastify.decorateRequest("taskValidator", taskValidator);
});
