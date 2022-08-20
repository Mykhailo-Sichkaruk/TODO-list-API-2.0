import * as handler from "./handler.js";
import * as schema from "./schema.js";

const postListOptions = {
	schema: schema.post,
	handler: handler.post,
};

const deleteListOptions = {
	schema: schema.deleteL,
	handler: handler.deleteL,
};

const putListOptions = {
	schema: schema.put,
	handler: handler.put,
};

const getOneListOptions = {
	schema: schema.getOne,
	handler: handler.getOne,
};

const getAllListsOptions = {
	schema: schema.getAll,
	handler: handler.getAll,
};

const subscribeToListOptions = {
	schema: schema.subscribe,
	handler: handler.subscribe,
};

export { postListOptions, deleteListOptions, putListOptions, getOneListOptions, getAllListsOptions, subscribeToListOptions };
