import { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import { isAuthenticated } from "../../auth/auth.services";
import {
  handleCreateBookshop,
  handleUpdateBookshop,
  handleGetBookshopsByFilter,
  handleGetBookshopById,
} from "./bookshop.controller";

const router = Router();

// Apply security middleware to enhance security
router.use(helmet());

// Apply CORS middleware to handle cross-origin requests
router.use(cors());

// Apply isAuthenticated middleware to all routes
router.use(isAuthenticated);

// POST api/libraries -- create a new library --
router.post("/", handleCreateBookshop);

// PATCH api/libraries -- update a library --
router.patch("/:id", handleUpdateBookshop);

// GET api/libraries/search? -- search books --
router.get("/search", handleGetBookshopsByFilter);

// GET api/libraries/:id -- retrieve library by id --
router.get("/:id", handleGetBookshopById);

export default router;