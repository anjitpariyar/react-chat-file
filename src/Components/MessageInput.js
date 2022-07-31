import React, { useState } from "react";
import "./messageinput.styled.scss";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import Skeleton from "@mui/material/Skeleton";
// cloudinary.config({
//   cloud_name: process.env.REACT_APP_CLOUD_NAME,
//   api_key: process.env.REACT_APP_API_KEY,
//   api_secret: process.env.REACT_APP_API_SECRET,
// });

const MessageInput = ({ send, text, handleChange, imageurl }) => {
  const [imgLoader, setimgLoader] = useState(false);
  const API = async (image) => {
    setimgLoader(true);
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
      handleChange("imageurl", resp.data.url);
      setimgLoader(false);
    } catch (err) {
      console.log("errr : ", err);
      handleChange("imageurl", "");
      setimgLoader(false);
      alert("Error in uploading  image ");
    }
  };

  const ImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file.size / (1024 * 1024) > 5) {
      alert("you can only upload images under 5MB");
    } else {
      API(file);
    }
  };

  return (
    <form method="" action="#!" onSubmit={send} className="messageInput">
      <div className="form-group">
        {!imgLoader ? (
          imageurl && (
            <div className="imput--img">
              <img src={imageurl} alt="none" />
              <span className="cross">
                <ClearIcon />
              </span>
            </div>
          )
        ) : (
          <div className="imput--img">
            <Skeleton variant="rectangular" width={60} height={60} />
          </div>
        )}
        <input
          className="form-control"
          placeholder="write your message"
          value={text}
          onChange={(event) => handleChange("text", event.target.value)}
          required
          autoFocus
          // autoComplete={text.toString()}
        />
        <label className="upimageLabel" htmlFor="upimage">
          <PhotoRoundedIcon />
        </label>
        <button type="submit" disabled={!text}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48.251"
            height="48.251"
            viewBox="0 0 48.251 48.251"
          >
            <path
              id="Path_2"
              data-name="Path 2"
              d="M34.338,2.4a1.246,1.246,0,0,1,.257,1.388L20.5,35.5a1.246,1.246,0,0,1-2.285-.017L13.131,23.607,1.254,18.519a1.246,1.246,0,0,1-.015-2.282L32.95,2.143a1.246,1.246,0,0,1,1.385.257Z"
              transform="translate(23.397 -1.865) rotate(41)"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <input
        type="file"
        id="upimage"
        accept="image/*"
        onChange={ImageUpload}
        name="imageurl"
        hidden
      />
    </form>
  );
};

export default MessageInput;
