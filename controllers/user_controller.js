import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import {auth, db} from "../config/firebase_config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
} from "@firebase/firestore";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userCollection = collection(db, "users");

const sigInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (!response) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }


    const token = jwt.sign({ id: response.user.uid }, "secret");
    res.json({ token, userID: response.user.uid });

  } catch (err) {
    res.json({ message: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(userCollection, {
      id: response.user.uid,
      name,
      email,
      password
    });
    res.json({ message: "Successfully, User has been added." });
    
  } catch (err) {
    res.json({ message: err.message });
  }
};

export { sigInUser, registerUser };
