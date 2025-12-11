import { FastifyRequest, FastifyReply } from "fastify";
import { database } from "../lib/database";

interface AuthenticatedRequest extends FastifyRequest {
	user: {
		userId: string;
		email: string;
	};
}

class ListNutritionPlansController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const req = request as AuthenticatedRequest;

			const plans = database.getNutritionPlansByUserId(req.user.userId);

			const parsedPlans = plans.map((plan) => ({
				id: plan.id,
				data: JSON.parse(plan.data),
				createdAt: plan.createdAt,
				updatedAt: plan.updatedAt,
			}));

			return reply.send({ plans: parsedPlans });
		} catch (error: any) {
			return reply.code(400).send({
				error: error.message || "Erro ao listar planos nutricionais",
			});
		}
	}
}

export { ListNutritionPlansController };
