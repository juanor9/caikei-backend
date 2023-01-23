import { Router } from "express";
import {
    handleCreateUser
} from "./user.controller";

const router = Router();

// POST api/user/
router.post("/", handleCreateUser);
export default router;