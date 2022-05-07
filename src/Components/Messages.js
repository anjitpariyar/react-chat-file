import React, { forwardRef } from "react";

const Messages = forwardRef((props, ref) => {
  // console.log(props)
  const { name, username, text, timestamp, index, nameDevice } = props;
  const isUser =
    username === name || nameDevice === localStorage.getItem("name");
  let timeNow = null;

  if (timestamp) {
    timeNow = new Date(timestamp.seconds * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    });
  }
  return (
    <div
      className={isUser ? "active chatbox-wrapper" : "unknown chatbox-wrapper"}
      key={index}
    >
      <h2>{text} </h2>
      <time title={new Date(timestamp.seconds * 1000).toLocaleString()}>
        {timeNow}
      </time>
    </div>
  );
});

export default Messages;
