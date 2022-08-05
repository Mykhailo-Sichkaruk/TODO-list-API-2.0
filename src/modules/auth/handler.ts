import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const postRegister = async (request, reply) => {
	const { login, password } = request.body;
	try {
		// Check if user already exists
		let user = await prisma.user.findUnique({ where: { login } });
		// If user exists, return error
		if (user) {
			return reply.code(400).send({ error: "User already exists" });
		}
		// Create new user
		user = await prisma.user.create({
			data: {
				login,
				password,
			},
		}) as unknown as User;
		// Create new token
		const token = await reply.jwtSign({ id: user.id });
		// Return success
		return reply.code(200).send({ token, user });
	} catch (err) {
		reply.code(500);
		console.log(err);
	}
};

const postLogin = async (request, reply) => {
	const { login, password } = request.body;
	try {
		// Check if user exists
		const user = await prisma.user.findUnique({ where: { login } });
		// If user doesn't exist, return error
		if (!user) {
			return reply.code(400).send({ error: "User doesn't exist" });
		}
		// Check if password is correct
		if (user.password !== password) {
			return reply.code(400).send({ error: "Password is incorrect" });
		}
		// Respond success
		const token = await reply.jwtSign({ id: user.id });
		return reply.code(200).send({ token, user });

	} catch (err) {
		reply.code(500);
		console.log(err);
	}
};

export { postRegister, postLogin };
