import * as handler from "./handler.js";
import schema from "./schema.js";

const login = {
	schema,
	handler: handler.login,
};

const register = {
	schema,
	handler: handler.register,
};

export { login, register };
