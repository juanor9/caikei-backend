import { Router } from "express";
import {
  handleCreatePublisher,
  handleGetPublisherById,
  handleUpdatePublisher,
} from "./publisher.controller";
import { isAuthenticated } from "../../auth/auth.services";

const router = Router();

// POST api/publishers -- create publisher --
router.post("/", isAuthenticated, handleCreatePublisher);

// GET api/publishers/:id -- consult a publisher --
router.get("/:id", isAuthenticated, handleGetPublisherById);

// PATCH api/publishers/:id -- update a publisher --
router.patch("/:id", isAuthenticated, handleUpdatePublisher);

export default router;
