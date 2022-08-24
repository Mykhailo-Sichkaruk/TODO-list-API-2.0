const fastifySwaggerOptions = {
	routePrefix: "/docs",
	openapi: {},
	uiConfig: {
		docExpansion: "full",
		deepLinking: false,
	},
	staticCSP: true,
	exposeRoute: true,

};

const openapiOptions = {
	openapi: "3.0.0",
	info: {
		title: "TODO-list API",
		version: "1.0.0",
		description: "TODO-list tasks API",
	},
	servers: [
		{
			url: `http://localhost:${process.env.PORT}`,
			description: "Local server",
		},
	],
	components: {
		security: [
			{
				bearerAuth: [],
			},
		],
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
	consumes: ["application/json"],
	produces: ["application/json"],
	tags: [
		{ name: "auth", description: "Login and register" },
		{ name: "list", description: "CRUD + subscribe" },
		{ name: "task", description: "CRUD" },
	],
	host: `localhost:${process.env.PORT}`,
};

fastifySwaggerOptions.openapi = openapiOptions;

export default fastifySwaggerOptions;
