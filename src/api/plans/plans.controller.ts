import { getPlanById, getPlanAll } from "./plans.services";
import { Request, Response } from "express";
import { Types } from "mongoose";


export async function handleGetPlanById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  // Validar que el ID es un ObjectId válido
  if (!id || !Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing plan ID" });
    return;
  }

  try {
    const plan = await getPlanById(id);

    // Si el plan no se encuentra, devolver un 404
    if (!plan) {
      res.status(404).json({ message: "Plan not found" });
      return;
    }

    // Enviar la respuesta con el plan encontrado
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the plan", error });
  }
}

export async function handleGetPlanAll(req: Request, res: Response): Promise<void> {
  try {
    const plans = await getPlanAll();

    // Si no se encuentran planes, devolver un array vacío pero con un estado 200
    if (!plans || plans.length === 0) {
      res.status(200).json([]);
      return;
    }

    // Si se encuentran planes, devolverlos con un estado 200
    res.status(200).json(plans);
  } catch (error) {
    // Manejar cualquier error durante la operación
    res.status(500).json({ message: "An error occurred while fetching the plans", error });
  }
}
