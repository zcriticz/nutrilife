import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyRequest,
	FastifyReply,
} from "fastify";
import { CreateNutritionController } from "./controllers/CreateNutritionController";
import { RegisterController } from "./controllers/RegisterController";
import { LoginController } from "./controllers/LoginController";
import { GetUserController } from "./controllers/GetUserController";
import { ListNutritionPlansController } from "./controllers/ListNutritionPlansController";
import { GetNutritionPlanController } from "./controllers/GetNutritionPlanController";
import { authenticate } from "./middleware/auth";

export async function routes(
	fastify: FastifyInstance,
	options: FastifyPluginOptions
) {
	// Rotas públicas
	fastify.post(
		"/auth/register",
		async (request: FastifyRequest, reply: FastifyReply) => {
			return new RegisterController().handle(request, reply);
		}
	);

	fastify.post(
		"/auth/login",
		async (request: FastifyRequest, reply: FastifyReply) => {
			return new LoginController().handle(request, reply);
		}
	);

	// Rotas protegidas (requerem autenticação)
	fastify.get(
		"/auth/me",
		{ preHandler: [authenticate] },
		async (request: FastifyRequest, reply: FastifyReply) => {
			return new GetUserController().handle(request, reply);
		}
	);

	fastify.post(
		"/nutrition/create",
		{ preHandler: [authenticate] },
		async (request: FastifyRequest, reply: FastifyReply) => {
			return new CreateNutritionController().handle(request, reply);
		}
	);

	fastify.get(
		"/nutrition/list",
		{ preHandler: [authenticate] },
		async (request: FastifyRequest, reply: FastifyReply) => {
			return new ListNutritionPlansController().handle(request, reply);
		}
	);

	fastify.get(
		"/nutrition/:planId",
		{ preHandler: [authenticate] },
		async (request: FastifyRequest, reply: FastifyReply) => {
			return new GetNutritionPlanController().handle(request, reply);
		}
	);
}
