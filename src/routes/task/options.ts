import { deleteTaskHandler, postTaskHandler, putTaskHandler } from "./handler.js";
import * as schema from "./schema.js";

const postTaskOptions = {
	schema: schema.post,
	handler: postTaskHandler,
};

const putTaskOptions = {
	schema: schema.put,
	handler: putTaskHandler,
};

const deleteTaskOptions = {
	schema: schema.deleteT,
	handler: deleteTaskHandler,
};

export { postTaskOptions, putTaskOptions, deleteTaskOptions };
