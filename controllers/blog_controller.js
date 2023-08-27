import { db } from "../config/firebase_config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  limit,
  orderBy,
  query,
} from "@firebase/firestore";

const blogCollection = collection(db, "blogs");
const createBlog = async (req, res) => {
  try {
    const { title, coverImage, summary, content, author } = req.body;
    await addDoc(blogCollection, {
      title,
      coverImage,
      summary,
      content,
      author,
      createAt: new Date().toISOString().split('T')[0]
    });
    res.json({ message: "Blog has been added successfully!" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
const getBlogs = async (req, res) => {
  try {
    const q = query(blogCollection,orderBy("createAt"), limit(10));
    const data = await getDocs(q);

    res.json(data.docs.map((doc) => ({ ...doc.data(), blogId: doc.id })));
  } catch (err) {
    res.json({ message: err.message });
  }
};
const getSingleBlog = async (req, res) => {
  try {
    const blogId  = req.params.blogId;

    const docRef = doc(db, "blogs", blogId);
    const blogSnap = await getDoc(docRef);

    if (blogSnap.exists()) {
      res.json(blogSnap.data());
    } else {
      res.json({ message: "No such document!" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};
const updateBlog = async (req, res) => {
  try {
    const blogId  = req.params.blogId;
    await updateDoc(doc(db, "blogs", blogId), data);
    res.json({ message: "Blog has been updated successfully!" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const blogId  = req.params.blogId;
    console.log(blogId);
    const docRef = doc(db, "blogs", blogId);
    await deleteDoc(docRef);

    res.json({ message: "Blog has been deleted successfully!" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export { createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog };
