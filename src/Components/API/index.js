import axios from "axios";
import db from "../Firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const ImageUploadAPI = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
  data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
  data.append("folder", "chat");

  try {
    const resp = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      data
    );
    // setimageData({url: resp.data.url, public_id: resp.data.public_id});
    console.log("resp", resp);
    return resp;
    // handleChange("imageurl", resp.data.url);
  } catch (err) {
    // console.log("errr : ", err);
    // handleChange("imageurl", "");
    alert("Error in uploading  image ");
    return err;
  }
};

export const sendMessageAPI = async (data) => {
  try {
    let docRef = await addDoc(collection(db, "chat12"), {
      ...data,
      timestamp: serverTimestamp(),
    });

    return docRef;
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
    // handleChange("text", "");
  }
};
