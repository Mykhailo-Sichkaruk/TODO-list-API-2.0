import { FastifyServerOptions } from "fastify";

const options: FastifyServerOptions = {
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname,remoteAdress,remotePort,reqId,remoteAdress,hostname,remotePort",
			},
		},
	},
	ajv: {
		customOptions: {
			strict: true,
			removeAdditional: true,
			useDefaults: false,
			coerceTypes: false,
			allErrors: false,
		},
	},
};

export default options;
