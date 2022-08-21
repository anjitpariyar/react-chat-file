import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import ReactBnbGallery from "react-bnb-gallery";

const Messages = (props) => {
  // console.log(props);
  const { name, username, text, timestamp, index, nameDevice, imageurl } =
    props;
  const isUser =
    username === name || nameDevice === localStorage.getItem("name");
  const [timeNow, settimeNow] = useState(null);
  const [textArray, setTextArray] = useState([]);
  const [islLnk, setIslLnk] = useState(false);

  // useState

  // convert time into readable formate
  useEffect(() => {
    if (timestamp?.seconds) {
      let timetemp = new Date(timestamp.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
      });
      settimeNow(timetemp);
    }
  }, [timestamp]);

  // this will check for the text and link
  useEffect(() => {
    let regx = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    let link = text.match(regx);
    // console.log(link);
    if (link) {
      setIslLnk(true);
      let temp = text.split(link[0]);
      temp.splice(1, 0, link[0]);
      // console.log("temp", temp);
      setTextArray(temp);
    }
  }, [text]);

  const [showBox, setshowBox] = useState(false);

  return (
    <>
      <div
        className={
          isUser ? "active chatbox-wrapper" : "unknown chatbox-wrapper"
        }
        key={index}
      >
        <div className="chatbox-wrapper-inner">
          {imageurl && (
            <>
              <div className="image--wrapper" onClick={() => setshowBox(true)}>
                <img
                  src={imageurl.replace(
                    "/upload/",
                    "/upload/c_thumb,w_200,g_face/"
                  )}
                  alt="chat anonymous"
                />
              </div>
              <ReactBnbGallery
                show={showBox}
                photos={imageurl}
                onClose={() => setshowBox(false)}
              />
            </>
          )}

          {text && (
            <h2>
              {islLnk
                ? textArray.map((text, index) => {
                    if (index === 1) {
                      return (
                        <a
                          href={text}
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                          className="link"
                        >
                          {text}
                        </a>
                      );
                    } else {
                      return <span key={index}>{text}</span>;
                    }
                  })
                : text}
            </h2>
          )}
        </div>
        <Tooltip
          title={
            timestamp?.seconds
              ? new Date(timestamp.seconds * 1000).toLocaleString()
              : "NA"
          }
          placement="top"
          arrow
          className={"tooltip"}
        >
          <time>{timeNow || "NA"}</time>
        </Tooltip>
      </div>
    </>
  );
};

export default Messages;
