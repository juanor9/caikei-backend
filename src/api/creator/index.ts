import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import { handleCreateCreator } from "./creator.controller"

const router = Router();

// POST api/creators -- create creator --
router.post("/", isAuthenticated, handleCreateCreator);

export default router;