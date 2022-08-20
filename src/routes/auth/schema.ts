import { id, text, token } from "../../plugins/schema.js";

const loginPassword = {
	title: "Login or password",
	description: "Login or password schema",
	type: "string",
	minLength: 3,
	maxLength: 20,
	default: "admin",
};

const user = {
	title: "User",
	description: "User schema",
	type: "object",
	properties: {
		id,
		login: loginPassword,
	},
	required: ["id", "login"],
};

const authRequest = {
	type: "object",
	properties: {
		login: loginPassword,
		password: loginPassword,
	},
	required: ["login", "password"],
};

const authReply = {
	200: {
		type: "object",
		properties: {
			token,
			user,
		},
		required: ["token", "user"],
	},
	400: {
		type: "object",
		properties: {
			message: text,
		},
		required: ["message"],
	},
};

const auth = {
	body: authRequest,
	response: authReply,
	tags: ["auth"],
	summary: "Login or register",
	description: "Login or register",
	operationId: "auth",
	consumes: ["application/json"],
	produces: ["application/json"],
};

export default auth;
