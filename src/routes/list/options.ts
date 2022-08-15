import { deleteListSchema, getAllListsSchema, getOneListSchema, postListSchema, putListSchema, subscribeToListSchema } from "./schema.js";
import { deleteListHandler, getAllListsHandler, getOneListHandler, postListHandler, putListHandler, subscribeToListHandler } from "./handler.js";

const postListOptions = {
	schema: postListSchema,
	handler: postListHandler,
};

const deleteListOptions = {
	schema: deleteListSchema,
	handler: deleteListHandler,
};

const putListOptions = {
	schema: putListSchema,
	handler: putListHandler,
};

const getOneListOptions = {
	schema: getOneListSchema,
	handler: getOneListHandler,
};

const getAllListsOptions = {
	schema: getAllListsSchema,
	handler: getAllListsHandler,
};

const subscribeToListOptions = {
	schema: subscribeToListSchema,
	handler: subscribeToListHandler,
};

export { postListOptions, deleteListOptions, putListOptions, getOneListOptions, getAllListsOptions, subscribeToListOptions };
