import { deleteListSchema, getAllListsSchema, getOneListSchema, postListSchema, putListSchema, subscribeToListSchema } from "./chema";
import { deleteListHandler, getAllListsHandler, getOneListHandler, postListHandler, putListHandler, subscribeToListHandler } from "./handler";

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
