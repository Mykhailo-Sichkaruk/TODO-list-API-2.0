import { postTaskHandler } from "./handler";
import { postTaskSchema } from "./schema";

const postTaskOptions = {
	schema: postTaskSchema,
	handler: postTaskHandler,
};

export { postTaskOptions };
