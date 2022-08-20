import { defaultReply, defaultReplyMsg, id, idParam, task, text } from "../../plugins/schema.js";

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
	required: ["id", "title", "authorId", "tasks"],
};

// Post

const postBody = {
	title: "post",
	description: "post schema",
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
	title: "post",
	description: "Create list",
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

const getAll = {
	title: "GetAllLists",
	description: "Get subscribed lists",
	response: {
		200: {
			type: "array",
			items: list,
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

const subscribe = {
	title: "SubscribeList",
	description: "Subscribe to list by id",
	parameters: [idParam],
	response: defaultReply,
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

export { post, deleteL, put, getOne, getAll, subscribe };
