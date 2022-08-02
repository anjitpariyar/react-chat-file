import React, { useState } from "react";
import "./messageinput.styled.scss";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ClearIcon from "@mui/icons-material/Clear";

const MessageInput = ({ send, text, handleChange, setFile }) => {
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
    setempImg("");
    setFile("");
  };

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
