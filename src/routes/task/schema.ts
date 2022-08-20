import { deadline, defaultReply, id, status, task, text } from "./../../plugins/schema.js";

// Post

const postBody = {
	title: "post",
	description: "post schema",
	type: "object",
	properties: {
		title: text,
		body: text,
		listId: id,
		status,
		deadline,
	},
	required: ["title", "body", "listId", "status"],
};

const postReply = {
	200: {
		type: "object",
		properties: {
			message: text,
			task,
		},
		required: ["message", "task"],
	},
	400: defaultReply,
	401: defaultReply,
	404: defaultReply,
	500: defaultReply,
};

const post = {
	title: "Create task",
	description: "Create a new list",
	body: postBody,
	response: postReply,
	security: [{ bearerAuth: [] }],
	tag: ["task"],
};

// Put

const putBody = {
	title: "listSchema",
	description: "List",
	type: "object",
	properties: {
		id,
		title: text,
		body: text,
		deadline,
		status,
	},
	required: ["id"],
};

const put = {
	title: "Update task",
	description: "Update task",
	params: { id },
	body: putBody,
	response: defaultReply,
	security: [{ bearerAuth: [] }],
	tag: ["task"],
};

// Delete

const deleteT = {
	title: "deleteT",
	description: "Delete a task",
	params: { id },
	response: defaultReply,
	security: [{ bearerAuth: [] }],
	tag: ["task"],
};

export { post, put, deleteT };
