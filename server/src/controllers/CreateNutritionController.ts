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

class CreateNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, weight, height, age, gender, objective, level } =
      request.body as DataProps;

    const createNutrition = new CreateNutritionService();

    const nutrition = await createNutrition.execute({
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
  }
}

export { CreateNutritionController };
