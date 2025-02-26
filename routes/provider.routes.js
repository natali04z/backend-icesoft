import { Router } from "express";
import { getProviders, getOneProvider, postProvider, putProvider, deleteProvider } from "../controllers/provider.controller.js";

const router = Router();

router.get("/", getProviders);
router.get("/:id", getOneProvider);
router.post("/", postProvider);
router.put("/:id", putProvider);
router.delete("/:id", deleteProvider);

export default router