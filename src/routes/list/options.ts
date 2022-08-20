import * as handler from "./handler.js";
import * as schema from "./schema.js";

const post = {
	schema: schema.post,
	handler: handler.post,
};

const deleteO = {
	schema: schema.deleteL,
	handler: handler.deleteL,
};

const put = {
	schema: schema.put,
	handler: handler.put,
};

const getOne = {
	schema: schema.getOne,
	handler: handler.getOne,
};

const getAll = {
	schema: schema.getAll,
	handler: handler.getAll,
};

const subscribe = {
	schema: schema.subscribe,
	handler: handler.subscribe,
};

export { post, deleteO, put, getOne, getAll, subscribe };
