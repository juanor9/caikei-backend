import { Router } from "express";
import {
    handleCreateUser,
    handleGetUser,
} from "./user.controller";

const router = Router();

// POST api/user/
router.post("/", handleCreateUser);

// GET api/user/
router.get("/", handleGetUser);
export default router;