import { DataProps } from "../controllers/CreateNutritionController";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { database } from "../lib/database";

class CreateNutritionService {
	async execute({
		userId,
		name,
		age,
		gender,
		weight,
		height,
		level,
		objective,
	}: DataProps & { userId: string }) {
		try {
			if (!process.env.API_KEY) {
				throw new Error(
					"API_KEY não configurada. Configure a chave da API do Google AI no arquivo .env"
				);
			}

			const genAI = new GoogleGenerativeAI(process.env.API_KEY);
			const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

			console.log("Iniciando geração de conteúdo com Google Gemini...");

			const response = await model.generateContent(
				`Crie um plano nutricional personalizado para uma pessoa com as seguintes características:

        Nome: ${name}
        Idade: ${age} anos
        Gênero: ${gender}
        Peso: ${weight} kg
        Altura: ${height} cm
        Nível de Atividade Física: ${level}
        Objetivo: ${objective}

        Retorne um JSON com exatamente as seguintes propriedades:

          nome: "${name}",
          genero: "${gender === "M" ? "Masculino" : "Feminino"}",
          idade: ${age},
          peso: "${weight} kg",
          altura: "${height} cm",
          nivelAtividadeFisica: "${level}",
          objetivo: "${objective}",
          caloriasDiarias: número de calorias recomendadas por dia,
          macronutrientes: {
            proteinas: "X gramas",
            carboidratos: "X gramas",
            gorduras: "X gramas"
          },
          refeicoes: [
            {
              nome: "nome da refeição (ex: Café da Manhã, Almoço, etc - use acentos)",
              horario: "horário sugerido (ex: 07:30, 12:00, etc)",
              alimentos: ["alimento 1 com porções", "alimento 2 com porções", ...]
            }
          ],
          recomendacoes: ["sugestão 1", "sugestão 2", ...],
          hidratacao: "X litros por dia"

        IMPORTANTE:
        - Retorne APENAS JSON válido em UTF-8
        - Use acentos e caracteres especiais brasileiros normalmente
        - Nenhuma propriedade pode ter acento no nome da chave, apenas no valor
        - Não coloque qualquer observação além das passadas no prompt
        - Use nomes de propriedades em camelCase sem acentos
        - Use valores em português com acentos e pontuação corretos
        - Crie pelo menos 5 refeições por dia
        - Personalize os alimentos de acordo com o objetivo da pessoa`
			);

			console.log("Resposta recebida da API do Google Gemini");

			if (
				!response.response ||
				!response.response.candidates ||
				response.response.candidates.length === 0
			) {
				console.error("Resposta inválida:", JSON.stringify(response, null, 2));
				throw new Error(
					"A API do Google Gemini não retornou uma resposta válida"
				);
			}

			const candidate = response.response.candidates[0];

			if (candidate.finishReason && candidate.finishReason !== "STOP") {
				console.error(
					"Resposta bloqueada. Finish reason:",
					candidate.finishReason
				);
				throw new Error(`A resposta foi bloqueada: ${candidate.finishReason}`);
			}

			if (
				!candidate ||
				!candidate.content ||
				!candidate.content.parts ||
				candidate.content.parts.length === 0
			) {
				console.error(
					"Candidato inválido:",
					JSON.stringify(candidate, null, 2)
				);
				throw new Error(
					"Resposta da API do Google Gemini está vazia ou inválida"
				);
			}

			const jsonText = candidate.content.parts[0].text as string;

			if (!jsonText) {
				throw new Error("A resposta da API do Google Gemini não contém texto");
			}

			let jsonString = jsonText
				.replace(/```\w*\n/g, "")
				.replace(/\n```/g, "")
				.replace(/```json\n?/g, "")
				.replace(/```\n?/g, "")
				.trim();

			let jsonObject;
			try {
				jsonObject = JSON.parse(jsonString);
			} catch (parseError) {
				console.error("Erro ao fazer parse do JSON:", parseError);
				console.error("JSON recebido:", jsonString);
				throw new Error(
					"Erro ao processar a resposta da API. A resposta não é um JSON válido."
				);
			}

			console.log("JSON retornado:", JSON.stringify(jsonObject, null, 2));

			const nutritionPlan = database.createNutritionPlan(
				userId,
				JSON.stringify(jsonObject)
			);

			return { data: jsonObject, id: nutritionPlan.id };
		} catch (err: any) {
			console.error("Erro no CreateNutritionService:", err);
			console.error("Stack trace:", err.stack);

			const errorMessage = err.message || err.toString() || "";

			if (
				errorMessage.includes("API_KEY") ||
				errorMessage.includes("API key")
			) {
				throw new Error(
					"Chave da API do Google Gemini não configurada ou inválida. Verifique o arquivo .env"
				);
			}

			if (
				errorMessage.includes("quota") ||
				errorMessage.includes("limit") ||
				errorMessage.includes("429")
			) {
				throw new Error(
					"Limite de requisições da API do Google Gemini excedido. Tente novamente mais tarde"
				);
			}

			if (
				errorMessage.includes("permission") ||
				errorMessage.includes("403") ||
				errorMessage.includes("401")
			) {
				throw new Error(
					"Sem permissão para usar a API do Google Gemini. Verifique se sua chave de API está correta e ativa"
				);
			}

			if (
				errorMessage.includes("network") ||
				errorMessage.includes("ECONNREFUSED") ||
				errorMessage.includes("ENOTFOUND")
			) {
				throw new Error(
					"Erro de conexão com a API do Google Gemini. Verifique sua conexão com a internet"
				);
			}

			if (errorMessage.includes("model") || errorMessage.includes("404")) {
				throw new Error(
					"Modelo do Google Gemini não encontrado. Verifique se o nome do modelo está correto"
				);
			}

			if (errorMessage.includes("safety") || errorMessage.includes("blocked")) {
				throw new Error(
					"A resposta foi bloqueada pelos filtros de segurança do Google Gemini. Tente ajustar o prompt"
				);
			}

			if (errorMessage && !errorMessage.includes("Failed to create")) {
				throw new Error(`Erro na API do Google Gemini: ${errorMessage}`);
			}

			throw new Error(
				errorMessage || "Erro ao criar plano nutricional. Tente novamente."
			);
		}
	}
}

export { CreateNutritionService };
