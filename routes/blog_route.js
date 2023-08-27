import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blog_controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:blogId", getSingleBlog);

router.post("/", createBlog);
router.put("/:blogId", updateBlog);
router.delete("/:blogId", deleteBlog);

export { router as blogRouter };
