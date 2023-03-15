import { Router } from "express";
import { isAuthenticated } from "../auth/auth.services";
import { handleSendReport } from "./report.controller";

const router = Router();

// POST api/creators -- create creator --
router.post("/", isAuthenticated, handleSendReport);

export default router;