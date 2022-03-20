import { Router } from "express";
import { ensureValidUrlToDecode } from "../middlewares/ensureValidUrlToDecode";
import { ensureValidUrlToEncode } from "../middlewares/ensureValidUrlToEncode";
import { decodeUrlRoutes } from "./decodeUrl.routes";

import { encodeUrlRoutes } from "./encodeUrl.routes";

const router = Router();

router.use("/encode", ensureValidUrlToEncode, encodeUrlRoutes);
router.use("/decode", ensureValidUrlToDecode, decodeUrlRoutes)

export { router };
