import express from "express";
import multer from "multer";

import { uploadImage } from "../controllers/upload_image_controller.js";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

router.post("/", upload, uploadImage);

export { router as imageRouter };
