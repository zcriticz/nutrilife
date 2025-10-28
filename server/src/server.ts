import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ error: error.message });
});

const start = async () => {
  app.register(cors);
  app.register(routes);

  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
  } catch (e) {
    console.log(e);
  }
};

start();
