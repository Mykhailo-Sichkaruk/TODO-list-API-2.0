const requestBodySchema = {
	type: "object",
	properties: {
		login: {
			type: "string",
			minLength: 3,
			maxLength: 255,
		},
		password: {
			type: "string",
			minLength: 3,
			maxLength: 255,
		},
	},
	required: ["login", "password"],
};

const responseSchema = {
	type: "object",
	properties: {
		token: {
			type: "string",
			minLength: 3,
			maxLength: 255,
		},
		user: {
			type: "object",
			properties: {
				id: {
					type: "string",
					minLength: 3,
					maxLength: 255,
				},
				login: {
					type: "string",
					minLength: 3,
					maxLength: 255,
				},
				password: {
					type: "string",
					minLength: 3,
					maxLength: 255,
				},
			},
		},
	},
	required: ["token"],
};

const authSchema = {
	body: requestBodySchema,
	response: {
		200: responseSchema,
	},
	tags: ["auth"],
	summary: "Login or register",
	description: "Login or register",
	operationId: "auth",
	consumes: ["application/json"],
	produces: ["application/json"],
};

export default authSchema;
