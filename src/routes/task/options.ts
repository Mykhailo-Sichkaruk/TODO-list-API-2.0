import { postTaskHandler } from "./handler.js";
import { postTaskSchema } from "./schema.js";

const postTaskOptions = {
	schema: postTaskSchema,
	handler: postTaskHandler,
};

export { postTaskOptions };
