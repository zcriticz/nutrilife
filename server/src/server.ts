import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { routes } from "./routes";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
	reply.code(400).send({ error: error.message });
});

const start = async () => {
	app.register(cors);

	app.register(jwt, {
		secret:
			process.env.JWT_SECRET || "nutrilife-secret-key-change-in-production",
	});

	app.register(routes);

	try {
		await app.listen({ port: 3333, host: "0.0.0.0" });
	} catch (err) {
		console.log(err);
	}
};

start();
