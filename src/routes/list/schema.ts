import { bearerAuth, idSchema, textSchema } from "../auth/schema";

const listSchema = {
	title: "List",
	description: "List schema",
	type: "object",
	properties: {
		id: idSchema,
		title: textSchema,
		authorId: idSchema,
	},
	required: ["id", "title", "authorId"],
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

// Post

const postListRequestSchema = {
	title: "PostList",
	description: "PostList schema",
	type: "object",
	properties: {
		title: textSchema,
	},
	required: ["title"],
};

const postListResponseSchema = {
	200: {
		type: "object",
		properties: {
			id: idSchema,
			title: textSchema,
		},
		required: ["id", "title"],
	},
	400: defaultResponseMsgSchema,
	401: defaultResponseMsgSchema,
	404: defaultResponseMsgSchema,
	500: defaultResponseMsgSchema,
};

const postListSchema = {
	title: "PostList",
	description: "Create list",
	body: postListRequestSchema,
	response: postListResponseSchema,
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Delete

const idParamSchema = {
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

const deleteListSchema = {
	title: "DeleteList",
	description: "Delete list by id, if you are author of list",
	parameters: [idParamSchema],
	response: defaultResponseSchema,
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Put

const putListBodySchema = {
	title: "PutList",
	description: "PutList schema",
	type: "object",
	properties: {
		title: textSchema,
	},
	required: ["title"],
};

const putListResponseSchema = {
	200: {
		type: "object",
		properties: {
			message: textSchema,
			list: listSchema,
		},
		required: ["message", "list"],
	},
	400: defaultResponseMsgSchema,
	401: defaultResponseMsgSchema,
	404: defaultResponseMsgSchema,
	500: defaultResponseMsgSchema,
};

const putListSchema = {
	title: "PutList",
	description: "Update list by id",
	body: putListBodySchema,
	parameters: [idParamSchema],
	response: putListResponseSchema,
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Get one

const getOneListSchema = {
	title: "GetOneList",
	description: "Get one list by id",
	parameters: [idParamSchema],
	response: {
		200: {
			type: "object",
			properties: {
				list: listSchema,
			},
			required: ["list"],
		},
		400: defaultResponseMsgSchema,
		401: defaultResponseMsgSchema,
		404: defaultResponseMsgSchema,
		500: defaultResponseMsgSchema,
	},
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Get all

const getAllListsSchema = {
	title: "GetAllLists",
	description: "Get subscribed lists",
	response: {
		200: {
			type: "array",
			items: listSchema,
		},
		400: defaultResponseMsgSchema,
		401: defaultResponseMsgSchema,
		404: defaultResponseMsgSchema,
		500: defaultResponseMsgSchema,
	},
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

// Subscribe

const subscribeToListSchema = {
	title: "SubscribeList",
	description: "Subscribe to list by id",
	parameters: [idParamSchema],
	response: defaultResponseSchema,
	tags: ["list"],
	security: [ { bearerAuth: [] } ],
};

export { postListSchema, deleteListSchema, putListSchema, getOneListSchema, getAllListsSchema, subscribeToListSchema };