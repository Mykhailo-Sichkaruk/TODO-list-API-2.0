import { deleteListHandler, getAllListsHandler, getOneListHandler, postListHandler, putListHandler, subscribeToListHandler } from "./handler.js";
import * as schema from "./schema.js";

const postListOptions = {
	schema: schema.post,
	handler: postListHandler,
};

const deleteListOptions = {
	schema: schema.deleteL,
	handler: deleteListHandler,
};

const putListOptions = {
	schema: schema.put,
	handler: putListHandler,
};

const getOneListOptions = {
	schema: schema.getOne,
	handler: getOneListHandler,
};

const getAllListsOptions = {
	schema: schema.getAll,
	handler: getAllListsHandler,
};

const subscribeToListOptions = {
	schema: schema.subscribe,
	handler: subscribeToListHandler,
};

export { postListOptions, deleteListOptions, putListOptions, getOneListOptions, getAllListsOptions, subscribeToListOptions };
