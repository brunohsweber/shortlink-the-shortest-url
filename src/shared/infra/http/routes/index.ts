import { Router } from "express";
import { ensureUrlExists } from "../middlewares/ensureUrlExists";
import { ensureValidUrlToDecode } from "../middlewares/ensureValidUrlToDecode";
import { ensureValidUrlToEncode } from "../middlewares/ensureValidUrlToEncode";
import { decodeUrlRoutes } from "./decodeUrl.routes";

import { encodeUrlRoutes } from "./encodeUrl.routes";

const router = Router();

router.use("/encode", ensureUrlExists, ensureValidUrlToEncode, encodeUrlRoutes);
router.use("/decode", ensureUrlExists, ensureValidUrlToDecode, decodeUrlRoutes)

export { router };
