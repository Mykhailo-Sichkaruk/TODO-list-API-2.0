import { idSchema, textSchema } from "./../auth/schema.js";
import { defaultResponseSchema } from "./../list/schema.js";

const deadlineSchema = {
	type: "string",
	format: "date-time",
	description: "The deadline of the task",
	default: "2020-01-01T00:00:00.000Z",
};

const statusSchema = {
	enum: ["DONE", "CLOSED", "ACTIVE", "IN_PROGRESS"],
	description: "The status of the task",
};

const taskSchema = {
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
	required: ["id", "title", "body", "authorId", "deadline", "listId", "status"],
};

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

const postTaskSchema = {
	title: "Create task",
	description: "Create a new list",
	body: postTaskRequestSchema,
	response: defaultResponseSchema,
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

export { postTaskSchema, putTaskSchema, deleteTaskSchema, taskSchema };
