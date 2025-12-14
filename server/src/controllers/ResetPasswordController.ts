import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService";

export interface ResetPasswordRequest {
	token: string;
	newPassword: string;
}

class ResetPasswordController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { token, newPassword } = request.body as ResetPasswordRequest;

			if (!token || !newPassword) {
				return reply.code(400).send({
					error: "Token e nova senha são obrigatórios",
				});
			}

			if (newPassword.length < 6) {
				return reply.code(400).send({
					error: "A senha deve ter no mínimo 6 caracteres",
				});
			}

			const authService = new AuthService();
			const result = await authService.resetPassword(token, newPassword);

			return reply.send(result);
		} catch (err: any) {
			return reply.code(400).send({
				error: err.message || "Erro ao redefinir senha",
			});
		}
	}
}

export { ResetPasswordController };
