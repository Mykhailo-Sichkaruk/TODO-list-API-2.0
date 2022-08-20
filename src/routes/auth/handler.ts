import { Request } from "../../plugins/prisma.js";
import { PrismaClient, User } from "@prisma/client";
import { FastifyReply } from "fastify";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const register = async (request: Request, reply: FastifyReply) => {
	const { login, password } = request.body;
	// Check if user already exists
	let user = await prisma.user.findUnique({ where: { login } });
	if (user)
		return reply.code(400).send({ message: "User already exists" });
	// Create new user
	user = await prisma.user.create({
		data: {
			login,
			password: await bcrypt.hash(password, 10),
		},
	}) as unknown as User;
	// Return token and user
	const token = await reply.jwtSign({ id: user.id });
	return reply.code(200).send({ token, user });
};

const login = async (request: Request, reply: FastifyReply) => {
	const { login, password } = request.body;
	// Check if user exists
	const user = await prisma.user.findUnique({ where: { login } });
	if (!user)
		return reply.code(400).send({ message: "User doesn't exist" });
		// Check if password is correct
	if (!await bcrypt.compare(password, user.password))
		return reply.code(400).send({ message: "Password is incorrect" });
		// Return token and user
	const token = await reply.jwtSign({ id: user.id });
	return reply.code(200).send({ token, user });
};

export { register, login };
