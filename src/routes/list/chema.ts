import { idSchema, textSchema } from "../auth/schema";

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
};

const postListSchema = {
	title: "PostList",
	description: "Create list",
	body: postListRequestSchema,
	response: postListResponseSchema,
	tags: ["list"],
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

const deleteListResponseSchema = {
	200: defaultResponseMsgSchema,
	401: defaultResponseMsgSchema,
};

const deleteListSchema = {
	title: "DeleteList",
	description: "Delete list by id, if you are author of list",
	parameters: [idParamSchema],
	response: deleteListResponseSchema,
	tags: ["list"],
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
};

const putListSchema = {
	title: "PutList",
	description: "Update list by id",
	body: putListBodySchema,
	parameters: [idParamSchema],
	response: putListResponseSchema,
	tags: ["list"],
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
	},
	tags: ["list"],
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
	},
	tags: ["list"],
};


export { postListSchema, deleteListSchema, putListSchema, getOneListSchema, getAllListsSchema };
