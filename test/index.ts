import startServer from "../src/server";
import fastifyOptions from "../src/plugins/fastifyOptions";

const server = await startServer({ ajv: fastifyOptions.ajv });

async function test() {
	server.inject({
		method: "POST",
		url: "/auth",
		payload: {
			login: "admin",
			password: "admin",
		},
	});
}

test();
