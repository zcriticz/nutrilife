import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		await request.jwtVerify();

		// Verificar se request.user foi populado corretamente
		if (!request.user) {
			console.error("Erro: request.user não foi populado após jwtVerify");
			return reply.code(401).send({ error: "Token inválido" });
		}

		// Log para debug
		console.log("Usuário autenticado:", JSON.stringify(request.user, null, 2));
	} catch (err: any) {
		console.error("Erro na autenticação:", err.message || err);
		return reply.code(401).send({ error: "Não autorizado" });
	}
}
