import { Router } from "express";

import { EncodeURLController } from "@modules/shortlink/useCases/encodeURL/EncodeURLController";

const encodeURLRoutes = Router();

const encodeURLController = new EncodeURLController();

encodeURLRoutes.post("/", encodeURLController.handle);

export { encodeURLRoutes };