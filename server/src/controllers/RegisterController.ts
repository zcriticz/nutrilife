import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService";
import "@fastify/jwt";

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
}

class RegisterController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { email, password, name } = request.body as RegisterRequest;

			if (!email || !password || !name) {
				return reply.code(400).send({
					error: "Email, senha e nome são obrigatórios",
				});
			}

			const authService = new AuthService();
			const user = await authService.register({ email, password, name });

			const token = request.server.jwt.sign({
				userId: user.id,
				email: user.email,
			});

			return reply.send({
				user,
				token,
			});
		} catch (err: any) {
			console.error("Erro ao registrar usuário:", err);
			return reply.code(400).send({
				error: err.message || "Erro ao criar usuário",
			});
		}
	}
}

export { RegisterController };
