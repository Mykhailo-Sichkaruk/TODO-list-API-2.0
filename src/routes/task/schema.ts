import { deadline, defaultReply, defaultReplyMsg, id, status, task, text } from "./../../plugins/schema.js";

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
	400: defaultReplyMsg,
	401: defaultReplyMsg,
	404: defaultReplyMsg,
	500: defaultReplyMsg,
};

const post = {
	title: "Create task",
	description: "Create a new list",
	body: postBody,
	response: postReply,
	security: [{ bearerAuth: [] }],
	tags: ["task"],
};

// Put

const putBody = {
	title: "listSchema",
	description: "List",
	type: "object",
	properties: {
		title: text,
		body: text,
		deadline,
		status,
	},
};

const putReply = {
	200: {
		type: "object",
		properties: {
			message: text,
			task,
		},
		required: ["message", "task"],
	},
	400: defaultReplyMsg,
	401: defaultReplyMsg,
	404: defaultReplyMsg,
	500: defaultReplyMsg,
};

const put = {
	title: "Update task",
	description: "Update task",
	params: { id },
	body: putBody,
	response: putReply,
	security: [{ bearerAuth: [] }],
	tags: ["task"],
};

// Delete

const deleteT = {
	title: "deleteT",
	description: "Delete a task",
	params: { id },
	response: defaultReply,
	security: [{ bearerAuth: [] }],
	tags: ["task"],
};

export { post, put, deleteT };
