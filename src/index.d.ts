import { Status } from "@prisma/client";
import { FastifyReply } from "fastify";
import { Request } from "./plugins/prisma";

export type Route = (request: Request, reply: FastifyReply) => Promise<void>;

export type taskData = {
    title?: string;
    body?: string;
    deadline?: string | Date;
    status?: Status;
}

export type PostTaskData = {
    title: string;
    body: string;
    deadline: string | Date;
    status?: Status;
}

export type Auth = {
    login: string;
    password: string;
}

export type PostTask = {
    listId: string,
    title: string,
    body: string,
    deadline: string,
    status: Status
};
