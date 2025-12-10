import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService";

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

class RegisterController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password, name } = request.body as RegisterRequest;

      if (!email || !password) {
        return reply.code(400).send({
          error: "Email e senha são obrigatórios",
        });
      }

      const authService = new AuthService();
      const user = await authService.register({ email, password, name });

      // Gerar token JWT
      const token = request.server.jwt.sign({
        userId: user.id,
        email: user.email,
      });

      return reply.send({
        user,
        token,
      });
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error);
      return reply.code(400).send({
        error: error.message || "Erro ao criar usuário",
      });
    }
  }
}

export { RegisterController };

