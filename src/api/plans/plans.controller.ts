import { getPlanById, getPlanAll } from "./plans.services";
import { Request, Response } from "express";

export async function handleGetPlanById(req: Request, res: Response){
  const { id } = req.params;
  const plan = await getPlanById(id);
  if(!plan){
    return res.status(404).json({message: 'plan not found'})
  }
  return res.status(200).json(plan);
}

export async function handleGetPlanAll(req: Request, res: Response){
  const plans = await getPlanAll();

  if (!plans){
    return res.status(404).json({message: 'plan not found'})
  }
  return res.status(200).json(plans);
}