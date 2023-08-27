import express from "express";
import cors from "cors";
import  dotenv from "dotenv"; dotenv.config();
import { userRouter } from "./routes/user_route.js";
import { blogRouter } from "./routes/blog_route.js";
import { imageRouter } from "./routes/upload_image_route.js";


const app = express();
app.use(express.json());
app.use(cors());

app.get("/test/:blogId", (req, res) => {
    const blogId = req.params.blogId;
    const limit = req.query.limit;
    const page = req.query.page;
    res.json({
        blogId,
        limit,
        page
    });
});
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/images", imageRouter);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log("Server run successfully on PORT", PORT));
