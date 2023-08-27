import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  uploadBytesResumable,
  list,
} from "@firebase/storage";
import { storage } from "../config/firebase_config.js";
import { v4 } from "uuid";

const uploadImage = async(req, res) => {
  try{
    const storageRef = ref(storage, `images/${req.file.originalname + v4()}`);
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      {contentType: req.file.mimetype,}
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    res.json({url: downloadURL});
  }catch(err){
    res.json({message: err});
  }
}



const imagesCollection = ref(storage, "images/");

const getAllImages = (req, res) => {
  try {
    const data = [];
    listAll(imagesCollection).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          data.push(url);
        });
      });
    });

    res.json({ images: data });
  } catch (err) {
    res.json({ message: err });
  }
}

export { getAllImages, uploadImage };
