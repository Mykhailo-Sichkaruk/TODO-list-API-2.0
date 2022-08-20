import * as handler from "./handler.js";
import * as schema from "./schema.js";

const post = {
	schema: schema.post,
	handler: handler.post,
};

const put = {
	schema: schema.put,
	handler: handler.put,
};

const deleteO = {
	schema: schema.deleteT,
	handler: handler.deleteT,
};

export { post, put, deleteO };
