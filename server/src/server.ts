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
  // Registrar CORS
  app.register(cors);

  // Registrar JWT
  app.register(jwt, {
    secret: process.env.JWT_SECRET || "nutrilife-secret-key-change-in-production",
  });

  // Registrar rotas
  app.register(routes);

  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
  } catch (e) {
    console.log(e);
  }
};

start();
