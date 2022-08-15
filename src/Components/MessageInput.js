import React, { useState, useEffect } from "react";
import "./messageinput.styled.scss";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { ImageUploadAPI } from "./Components/API";

const MessageInput = ({
  send,
  text,
  handleChange,
  setFile,
  imageurl,
  loader,
}) => {
  const [tempImg, setempImg] = useState("");

  const ImageUpload = (event) => {
    const file = event.target.files[0];
    if (file.size / (1024 * 1024) > 5) {
      alert("you can only upload images under 5MB");
    } else {
      // API(file);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        setempImg(result);
      };
      fileReader.readAsDataURL(file);
      setFile(file);
    }
  };

  const ImageDelete = () => {
    if (tempImg) {
      setempImg("");
      setFile("");
    }
  };
  useEffect(() => {
    if (!imageurl) {
      ImageDelete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageurl]);

  const deleteImage = async () => {
    const timestamp = new Date().getTime();
    const formData = new FormData();
    const signature = "060f23d7d3e79b14e66eaeccc4db143590e8bd16";
    formData.append("public_id", "zloa8zupd0exnbdrd3rv");
    formData.append("signature", signature);
    formData.append("api_key", process.env.REACT_APP_API_KEY);
    formData.append("timestamp", timestamp);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`,
      formData
    );
    console.log("res", res);
  };

  useEffect(() => {
    deleteImage();
  }, []);

  return (
    <form method="" action="#!" onSubmit={send} className="messageInput">
      <div className="form-group">
        {tempImg && (
          <div className="imput--img">
            <img src={tempImg} alt="loading" />
            <span className="cross" onClick={ImageDelete}>
              <ClearIcon />
            </span>
          </div>
        )}
        <input
          className="form-control"
          placeholder="write your message"
          value={text}
          onChange={(event) => handleChange("text", event.target.value)}
          required={tempImg ? false : true}
          autoFocus
          title="You cannot send empty message"

          // autoComplete={text.toString()}
        />
        <label className="upimageLabel" htmlFor="upimage">
          <PhotoRoundedIcon />
        </label>
        <button type="submit">
          {loader ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{
                margin: "auto",
                display: "block",
                shapeRendering: "auto",
              }}
              width="48.251"
              height="48.251"
              viewBox="0 0 50 50"
              preserveAspectRatio="xMidYMid"
            >
              <circle cx="20" cy="20" r="6">
                <animate
                  attributeName="cy"
                  dur="1s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
                  keyTimes="0;0.5;1"
                  values="23;77;23"
                ></animate>
              </circle>{" "}
            </svg>
          ) : (
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
          )}
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
