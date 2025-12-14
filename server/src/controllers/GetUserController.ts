import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService";

interface AuthenticatedRequest extends FastifyRequest {
	user: {
		userId: string;
		email: string;
	};
}

class GetUserController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const req = request as AuthenticatedRequest;
			const authService = new AuthService();
			const user = await authService.getUserById(req.user.userId);

			return reply.send({ user });
		} catch (err: any) {
			return reply.code(404).send({
				error: err.message || "Erro ao buscar usuário",
			});
		}
	}
}

export { GetUserController };
