import { DataProps } from "../controllers/CreateNutritionController";
import { GoogleGenerativeAI } from "@google/generative-ai";

class CreateNutritionService {
  async execute({
    name,
    age,
    gender,
    weight,
    height,
    level,
    objective,
  }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

      console.log(JSON.stringify(response, null, 2));

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as String;

        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        let jsonObject = JSON.parse(jsonString);

        console.log("JSON retornado:", JSON.stringify(jsonObject, null, 2));

        return { data: jsonObject };
      }
    } catch (e) {
      console.log("JSON Error", e);
      throw new Error("Failed to create a nutrition plan");
    }
  }
}
export { CreateNutritionService };
