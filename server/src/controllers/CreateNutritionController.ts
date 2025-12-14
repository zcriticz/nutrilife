import { FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionService } from "../services/CreateNutritionService";

export interface DataProps {
	name: string;
	weight: number;
	height: number;
	age: number;
	gender: string;
	objective: string;
	level: string;
}

interface AuthenticatedRequest extends FastifyRequest {
	user: {
		userId: string;
		email: string;
	};
}

class CreateNutritionController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const req = request as AuthenticatedRequest;

			// Validar se o usuário está autenticado.
			if (!req.user || !req.user.userId) {
				console.error("Erro: usuário não autenticado", req.user);
				return reply.code(401).send({
					error: "Usuário não autenticado",
				});
			}

			const { name, weight, height, age, gender, objective, level } =
				request.body as DataProps;

			console.log("Criando plano nutricional para userId:", req.user.userId);

			const createNutrition = new CreateNutritionService();

			const nutrition = await createNutrition.execute({
				userId: req.user.userId,
				name,
				weight,
				height,
				age,
				gender,
				objective,
				level,
			});

			reply.header("Content-Type", "application/json; charset=utf-8");
			reply.send(nutrition);
		} catch (err: any) {
			console.error("Erro no CreateNutritionController:", err);
			return reply.code(400).send({
				error: err.message || "Erro ao criar plano nutricional",
			});
		}
	}
}

export { CreateNutritionController };
