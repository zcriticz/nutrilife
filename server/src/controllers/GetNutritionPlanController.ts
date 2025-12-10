import { FastifyRequest, FastifyReply } from "fastify";
import { database } from "../lib/database";

interface AuthenticatedRequest extends FastifyRequest {
	user: {
		userId: string;
		email: string;
	};
}

interface Params {
	planId: string;
}

class GetNutritionPlanController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const req = request as AuthenticatedRequest & {
				params: Params;
			};

			const { planId } = req.params;

			if (!planId) {
				return reply.code(400).send({
					error: "ID do plano é obrigatório",
				});
			}

			const plan = database.getNutritionPlanById(planId, req.user.userId);

			if (!plan) {
				return reply.code(404).send({
					error: "Plano nutricional não encontrado",
				});
			}

			// Parse JSON string
			const parsedPlan = {
				id: plan.id,
				data: JSON.parse(plan.data),
				createdAt: plan.createdAt,
				updatedAt: plan.updatedAt,
			};

			return reply.send({ plan: parsedPlan });
		} catch (error: any) {
			return reply.code(400).send({
				error: error.message || "Erro ao buscar plano nutricional",
			});
		}
	}
}

export { GetNutritionPlanController };
