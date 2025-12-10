import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/AuthService";

export interface LoginRequest {
  email: string;
  password: string;
}

class LoginController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as LoginRequest;

      if (!email || !password) {
        return reply.code(400).send({
          error: "Email e senha são obrigatórios",
        });
      }

      const authService = new AuthService();
      const user = await authService.login({ email, password });

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
      return reply.code(401).send({
        error: error.message || "Erro ao fazer login",
      });
    }
  }
}

export { LoginController };

