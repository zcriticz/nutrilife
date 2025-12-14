import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService";

export interface ForgotPasswordRequest {
	email: string;
}

class ForgotPasswordController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { email } = request.body as ForgotPasswordRequest;

			if (!email) {
				return reply.code(400).send({
					error: "Email é obrigatório",
				});
			}

			const authService = new AuthService();
			const result = await authService.forgotPassword(email);

			return reply.send(result);
		} catch (err: any) {
			return reply.code(400).send({
				error: err.message || "Erro ao solicitar redefinição de senha",
			});
		}
	}
}

export { ForgotPasswordController };
