import { EncodeUrlController } from "@modules/shortlink/useCases/encodeUrl/EncodeUrlController";
import { Router } from "express";

const encodeUrlRoutes = Router();

const encodeUrlController = new EncodeUrlController();

encodeUrlRoutes.post("/", encodeUrlController.handle);

export { encodeUrlRoutes };