import { Router } from "express";
import {
  handleCreatePublisher,
  handleGetPublisherById,
  handleUpdatePublisher,
} from "./publisher.controller";
import { isAuthenticated } from "../../auth/auth.services";

const router = Router();

// POST api/publisher -- create publisher --
router.post("/", isAuthenticated, handleCreatePublisher);

// GET api/publisher/:id -- consult a publisher --
router.get("/:id", isAuthenticated, handleGetPublisherById);

// POST api/publisher/:id -- update a publisher --
router.patch("/:id", isAuthenticated, handleUpdatePublisher);

export default router;
