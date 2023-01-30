import { Router } from "express";
import { handleCreatePublisher } from "./publisher.controller";
import { isAuthenticated } from "../../auth/auth.services";

const router = Router();

// POST api/publisher -- create publisher --
router.post("/", isAuthenticated, handleCreatePublisher);

export default router;