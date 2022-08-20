import { deadlineSchema, defaultResponseSchema, idSchema, statusSchema, taskSchema, textSchema } from "./../../plugins/schema.js";

// Post

const postTaskRequestSchema = {
	title: "PostTask",
	description: "PostTask schema",
	type: "object",
	properties: {
		title: textSchema,
		body: textSchema,
		listId: idSchema,
		status: statusSchema,
		deadline: deadlineSchema,
	},
	required: ["title", "body", "listId", "status"],
};

const postTaskResponseSchema = {
	200: {
		type: "object",
		properties: {
			message: textSchema,
			task: taskSchema,
		},
		required: ["message", "task"],
	},
	400: defaultResponseSchema,
	401: defaultResponseSchema,
	404: defaultResponseSchema,
	500: defaultResponseSchema,
};

const postTaskSchema = {
	title: "Create task",
	description: "Create a new list",
	body: postTaskRequestSchema,
	response: postTaskResponseSchema,
	security: [{ bearerAuth: [] }],
	tag: ["task"],
};

// Put

const putTaskBodySchema = {
	title: "listSchema",
	description: "List",
	type: "object",
	properties: {
		id: idSchema,
		title: textSchema,
		body: textSchema,
		authorId: idSchema,
		deadline: deadlineSchema,
		listId: idSchema,
		status: statusSchema,
	},
};

const putTaskSchema = {
	title: "putTaskSchema",
	description: "Update a task",
	params: {
		id: idSchema,
	},
	body: putTaskBodySchema,
	response: defaultResponseSchema,
	security: [{ bearerAuth: [] }],
	tag: ["task"],
};

// Delete

const deleteTaskSchema = {
	title: "deleteTaskSchema",
	description: "Delete a task",
	params: {
		id: idSchema,
	},
	response: defaultResponseSchema,
	security: [{ bearerAuth: [] }],
	tag: ["task"],
};

export { postTaskSchema, putTaskSchema, deleteTaskSchema };
