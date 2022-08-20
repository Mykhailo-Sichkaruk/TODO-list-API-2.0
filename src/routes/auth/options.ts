import { postLogin, postRegister } from "./handler.js";
import schema from "./schema.js";

const login = {
	schema,
	handler: postLogin,
};

const register = {
	schema,
	handler: postRegister,
};

export { login, register };
