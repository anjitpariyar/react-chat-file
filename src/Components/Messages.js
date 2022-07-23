import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

const Messages = (props) => {
  console.log(props);
  // console.log(props)
  const { name, username, text, timestamp, index, nameDevice } = props;
  const isUser =
    username === name || nameDevice === localStorage.getItem("name");
  const [timeNow, settimeNow] = useState(null);

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

  return (
    <div
      className={isUser ? "active chatbox-wrapper" : "unknown chatbox-wrapper"}
      key={index}
    >
      <h2>{text || "Message is deleted"} </h2>
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
  );
};

export default Messages;
