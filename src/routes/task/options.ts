import { deleteTaskHandler, postTaskHandler, putTaskHandler } from "./handler.js";
import { deleteTaskSchema, postTaskSchema, putTaskSchema } from "./schema.js";

const postTaskOptions = {
	schema: postTaskSchema,
	handler: postTaskHandler,
};

const putTaskOptions = {
	schema: putTaskSchema,
	handler: putTaskHandler,
};

const deleteTaskOptions = {
	schema: deleteTaskSchema,
	handler: deleteTaskHandler,
};

export { postTaskOptions, putTaskOptions, deleteTaskOptions };
