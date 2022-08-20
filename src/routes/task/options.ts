import * as handler from "./handler.js";
import * as schema from "./schema.js";

const postTaskOptions = {
	schema: schema.post,
	handler: handler.post,
};

const putTaskOptions = {
	schema: schema.put,
	handler: handler.put,
};

const deleteTaskOptions = {
	schema: schema.deleteT,
	handler: handler.deleteT,
};

export { postTaskOptions, putTaskOptions, deleteTaskOptions };
