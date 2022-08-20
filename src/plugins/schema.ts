const textSchema = {
	title: "Text",
	description: "Basic text schema",
	type: "string",
	minLength: 1,
	maxLength: 255,
	default: "Any text here",
};

const idSchema = {
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

const tokenSchema = {
	title: "Token",
	description: "Token schema",
	type: "string",
	minLength: 172,
	maxLength: 172,
	default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsNmhzOGJ6ajAwMDJqd3RhbThqYmQ1OTgiLCJpYXQiOjE2NjA5MjYyODQsImV4cCI6MTY2MDkyOTg4NH0.FfXv6bb2RR0jcT6pw7r3fGdiAI5qL6vWc9zPt7vkjY4",
};

const defaultResponseMsgSchema = {
	type: "object",
	properties: {
		message: textSchema,
	},
	required: ["message"],
};

const defaultResponseSchema = {
	200: defaultResponseMsgSchema,
	400: defaultResponseMsgSchema,
	401: defaultResponseMsgSchema,
	404: defaultResponseMsgSchema,
	500: defaultResponseMsgSchema,
};


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
};

export { textSchema, idSchema, bearerAuth, tokenSchema, defaultResponseSchema, taskSchema, defaultResponseMsgSchema, deadlineSchema, statusSchema };
