import express from "express";
import {
  sigInUser,
  registerUser
} from "../controllers/user_controller.js";

const router = express.Router();

router.post("/login", sigInUser);
router.post("/register", registerUser);

export { router as userRouter };
