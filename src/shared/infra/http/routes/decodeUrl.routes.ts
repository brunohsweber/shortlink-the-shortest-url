import { DecodeUrlController } from "@modules/shortlink/useCases/decodeUrl/DecodeUrlController";
import { Router } from "express";

const decodeUrlRoutes = Router();

const decodeUrlController = new DecodeUrlController();

decodeUrlRoutes.post("/", decodeUrlController.handle);

export { decodeUrlRoutes };