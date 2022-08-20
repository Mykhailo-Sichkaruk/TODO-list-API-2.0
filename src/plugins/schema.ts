const text = {
	title: "Text",
	description: "Basic text schema",
	type: "string",
	minLength: 1,
	maxLength: 255,
	default: "Any text here",
};

const id = {
	title: "Id",
	description: "Id schema",
	type: "string",
	minLength: 25,
	maxLength: 25,
	default: "cl6guzfl80002v8ta8oagfd5h",
};

const bearerAuth = {
	type: "http",
	scheme: "bearer",
	name: "Authorization",
	description: "Bearer authentication",
	bearerFormat: "JWT",
	in: "header",
};

const token = {
	title: "Token",
	description: "Token schema",
	type: "string",
	minLength: 172,
	maxLength: 172,
	default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsNmhzOGJ6ajAwMDJqd3RhbThqYmQ1OTgiLCJpYXQiOjE2NjA5MjYyODQsImV4cCI6MTY2MDkyOTg4NH0.FfXv6bb2RR0jcT6pw7r3fGdiAI5qL6vWc9zPt7vkjY4",
};

const defaultReplyMsg = {
	type: "object",
	properties: {
		message: text,
	},
	required: ["message"],
};

const defaultReply = {
	200: defaultReplyMsg,
	400: defaultReplyMsg,
	401: defaultReplyMsg,
	404: defaultReplyMsg,
	500: defaultReplyMsg,
};


const deadline = {
	type: "string",
	format: "date-time",
	description: "The deadline of the task",
	default: "2020-01-01T00:00:00.000Z",
};

const status = {
	enum: ["DONE", "CLOSED", "ACTIVE", "IN_PROGRESS"],
	description: "The status of the task",
};

const task = {
	title: "listSchema",
	description: "List",
	type: "object",
	properties: {
		id,
		title: text,
		body: text,
		authorId: id,
		deadline,
		listId: id,
		status,
	},
};

const idParam = {
	name: "id",
	in: "path",
	description: "List id",
	required: true,
	schema: {
		type: "string",
		minLength: 15,
		maxLength: 30,
	},
};

export { text, id, bearerAuth, token, defaultReply, task, defaultReplyMsg, deadline, status, idParam };
