import { postLogin, postRegister } from "./handler.js";
import schema from "./schema.js";

const loginOptions = {
	schema,
	handler: postLogin,
};

const registerOptions = {
	schema,
	handler: postRegister,
};

export { loginOptions, registerOptions };
