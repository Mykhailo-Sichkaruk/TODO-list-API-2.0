import fastifyOptions from "./plugins/fastifyOptions.js";
import startServer from "./server.js";

const server = await startServer(fastifyOptions);

try {
	console.log(server.printRoutes());
	server.swagger();
	await server.listen({ port: process.env.PORT as unknown as number, host: "0.0.0.0" });
} catch (err) {
	server.log.error(err);
	process.exit(1);
}
