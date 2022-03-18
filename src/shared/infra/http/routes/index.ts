import { Router } from "express";

import { encodeURLRoutes } from "./encodeURL.routes";

const router = Router();

router.use("/encode", encodeURLRoutes);

export { router };
