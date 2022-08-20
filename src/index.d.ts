import { FastifyReply } from "fastify";
import { Request } from "./plugins/prisma";

export type Route = (request: Request, reply: FastifyReply) => Promise<void>;
