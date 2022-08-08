const bearerAuth = {
	type: "http",
	scheme: "bearer",
	name: "Authorization",
	description: "Bearer authentication",
	bearerFormat: "JWT",
	in: "header",
};

const loginPasswordSchema = {
	title: "Login or password",
	description: "Login or password schema",
	type: "string",
	minLength: 3,
	maxLength: 20,
	default: "admin",
};

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

const tokenSchema = {
	title: "Token",
	description: "Token schema",
	type: "string",
	minLength: 172,
	maxLength: 172,
};

const userSchema = {
	title: "User",
	description: "User schema",
	type: "object",
	properties: {
		id: idSchema,
		login: loginPasswordSchema,
	},
	required: ["id", "login"],
};

const authRequestSchema = {
	type: "object",
	properties: {
		login: loginPasswordSchema,
		password: loginPasswordSchema,
	},
	required: ["login", "password"],
};

const authResponseSchema = {
	200: {
		type: "object",
		properties: {
			token: tokenSchema,
			user: userSchema,
		},
		required: ["token", "user"],
	},
	400: {
		type: "object",
		properties: {
			message: {
				title: "Message",
				description: "Message schema",
				type: "string",
				default: "Something went wrong",
			},
		},
		required: ["message"],
	},
};

const authSchema = {
	body: authRequestSchema,
	response: authResponseSchema,
	tags: ["auth"],
	summary: "Login or register",
	description: "Login or register",
	operationId: "auth",
	consumes: ["application/json"],
	produces: ["application/json"],
};

export { authSchema, textSchema, idSchema, bearerAuth };
