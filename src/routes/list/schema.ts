import { deadline, defaultReply, defaultReplyMsg, id, idParam, status, task, text } from "../../plugins/schema.js";

const list = {
	title: "List",
	description: "List schema",
	type: "object",
	properties: {
		id,
		title: text,
		authorId: id,
		tasks: {
			type: "array",
			items: task,
		},
	},
	required: ["id", "title"],
};

// Post

const postBody = {
	title: "Create List body",
	description: "Body to create a new list",
	type: "object",
	properties: {
		title: text,
	},
	required: ["title"],
};

const postReply = {
	200: {
		type: "object",
		properties: {
			id,
			title: text,
		},
		required: ["id", "title"],
	},
	400: defaultReplyMsg,
	401: defaultReplyMsg,
	404: defaultReplyMsg,
	500: defaultReplyMsg,
};

const post = {
	title: "Create list",
	description: "Create a new list",
	body: postBody,
	response: postReply,
	security: [ { bearerAuth: [] } ],
	tags: ["list"],
};

// Delete

const deleteL = {
	title: "deleteL",
	description: "Delete list by id, if you are author of list",
	parameters: [idParam],
	response: defaultReply,
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Put

const putBody = {
	title: "put",
	description: "put schema",
	type: "object",
	properties: {
		title: text,
	},
	required: ["title"],
};

const putReply = {
	200: {
		type: "object",
		properties: {
			message: text,
			list,
		},
		required: ["message", "list"],
	},
	400: defaultReplyMsg,
	401: defaultReplyMsg,
	404: defaultReplyMsg,
	500: defaultReplyMsg,
};

const put = {
	title: "put",
	description: "Update list by id",
	body: putBody,
	parameters: [idParam],
	response: putReply,
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Get one

const getOne = {
	title: "getOne",
	description: "Get one list by id",
	parameters: [idParam],
	response: {
		200: {
			type: "object",
			properties: {
				list,
			},
			required: ["list"],
		},
		400: defaultReplyMsg,
		401: defaultReplyMsg,
		404: defaultReplyMsg,
		500: defaultReplyMsg,
	},
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Get all

const replyTask = {
	type: "object",
	properties: {
		id,
		title: text,
		body: text,
		deadline,
		status,
	},
	required: ["id", "title", "body", "deadline", "status"],
};

const replyList = {
	title: "List",
	description: "List schema",
	type: "object",
	properties: {
		id,
		title: text,
		authorId: id,
		tasks: {
			type: "array",
			items: replyTask,
		},
	},
	required: ["id", "title"],
};

const getAll = {
	title: "GetAllLists",
	description: "Get subscribed lists",
	response: {
		200: {
			type: "array",
			items: replyList,
		},
		400: defaultReplyMsg,
		401: defaultReplyMsg,
		404: defaultReplyMsg,
		500: defaultReplyMsg,
	},
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Subscribe

const subscribeBody = {
	title: "subscribe",
	description: "subscribe schema",
	type: "object",
	properties: {
		subscriberId: id,
	},
	required: ["subscriberId"],
};

const subscribe = {
	title: "SubscribeList",
	description: "Subscribe to list by id",
	parameters: [idParam],
	response: defaultReply,
	body: subscribeBody,
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

export { post, deleteL, put, getOne, getAll, subscribe };
