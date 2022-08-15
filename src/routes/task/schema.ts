import { idSchema, textSchema } from "./../auth/schema.js";
import { defaultResponseSchema } from "./../list/schema.js";

const deadlineSchema = {
	type: "string",
	format: "date-time",
	description: "The deadline of the task",
	example: "2020-01-01T00:00:00.000Z",
};

const statusSchema = {
	enum: ["DONE", "CLOSED", "ACTIVE", "IN_PROGRESS"],
	description: "The status of the task",
};

const listSchema = {
	title: "listSchema",
	descriptions: "List",
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

const postTaskSchema = {
	title: "postListSchema",
	descriptions: "Create a new list",
	body: listSchema,
	response: defaultResponseSchema,
	security: [{ bearerAuth: [] }],
	tag: ["task"],
};

export { postTaskSchema };
