import { Request, Response } from "express";
import { createCreator } from "./creator.services";

export async function handleCreateCreator(req: Request, res: Response){
  const newCreator = req.body;

  try {
    newCreator.isActive = true;

    const creator = createCreator(newCreator);

    return res.status(200).json(creator);    
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}