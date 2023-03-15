import { Router } from "express";
import { isAuthenticated } from "../../auth/auth.services";
import { 
  HandleCreateMovement, 
  HandleGetMovementsByPublisher,
  handleGetMovementById
} from "./movement.controller";

const router = Router();

// POST api/movements -- create a new movement --
router.post("/", isAuthenticated, HandleCreateMovement);

// GET api/movements -- get movements from certain publishers --
router.get("/", isAuthenticated, HandleGetMovementsByPublisher);

// GET api/movements/:id -- get movement by id--
router.get("/:id", isAuthenticated, handleGetMovementById);

export default router;
