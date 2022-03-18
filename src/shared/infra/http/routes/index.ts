import { Router } from "express";

import { encodeRoutes } from "./encode.routes";

const router = Router();

router.use("/encode", encodeRoutes);

export { router };
