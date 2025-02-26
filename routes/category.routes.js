import { Router } from "express";
import { getCategories, getOneCategory, postCategory, putCategory, deleteCategory } from "../controllers/category.controller.js";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getOneCategory)
router.post("/", postCategory);
router.put("/:id", putCategory);
router.delete("/:id", deleteCategory);

export default router