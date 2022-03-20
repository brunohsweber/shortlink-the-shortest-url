import { Router } from "express";

import { EncodeURLController } from "@modules/shortlink/useCases/encodeURL/EncodeURLController";
import { ensureValidUrlToEncode } from "../middlewares/ensureValidUrlToEncode";

const encodeURLRoutes = Router();

const encodeURLController = new EncodeURLController();

encodeURLRoutes.post("/", ensureValidUrlToEncode, encodeURLController.handle);

export { encodeURLRoutes };