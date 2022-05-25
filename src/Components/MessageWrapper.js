import React, { useState, useEffect, useRef } from "react";

import Messages from "./Messages";
import Skeleton from "@mui/material/Skeleton";

import db from "./Firebase/Firebase";
import { useInView } from "react-intersection-observer";
import "firebase/firestore";

const MessageWrapper = () => {
  //for first 20 message at the start
  const [message, setMessage] = useState([]);

  // for scrolled up image
  const [messageAdded, setAddedMessage] = useState([]);

  // combining message and messageAdded
  const [totalMessage, setTotalMessage] = useState([]);

  const [countMessage, setCountMessage] = useState([]);

  const [pageSize, setPageSize] = useState(20);

  // state data for starting 20 data
  useEffect(() => {
    db.collection("chat12")
      .orderBy("timestamp", "asc")
      .limitToLast(20)
      .onSnapshot((snapshot) => {
        setMessage(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    db.collection("chat12")
      .get()
      .then((snap) => {
        setCountMessage(snap.size);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // added data when scrolling is update
  useEffect(() => {
    if (pageSize > 20) {
      db.collection("chat12")
        .orderBy("timestamp", "asc")
        .startAt(0)
        .endAt(30)
        .onSnapshot((snapshot) => {
          setAddedMessage([
            ...messageAdded,
            ...snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
          ]);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  // lets combine two different state chat
  useEffect(() => {
    // , ...messageAdded
    setTotalMessage([...new Set([...message])]);
  }, [message, messageAdded]);

  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  const messagesEndRef = useRef(null);

  // down to bottom whenever data changed only on message change
  useEffect(scrollToBottom, [message]);
  useEffect(() => console.log("messageAdded", messageAdded), [messageAdded]);

  // detect the view of loader
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setPageSize((pageSize) => pageSize + 10);
    }
    // chatRef.current.childNodes[9].scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="chat--wrapper">
      {message.length > 0 ? (
        <>
          {countMessage > pageSize && (
            <Skeleton
              variant="text"
              height={130}
              width={"30%"}
              style={{
                minWidth: "200px",
                borderRadius: "var(--br)",
                boxShadow: "-6px 9px var(--dark)",
              }}
              ref={ref}
            />
          )}
          <div ref={chatRef}>
            {totalMessage.map(({ id, data }) => (
              <Messages key={id} {...data} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <Skeleton
            variant="text"
            height={130}
            width={"30%"}
            style={{
              minWidth: "200px",
              borderRadius: "var(--br)",
              boxShadow: "-6px 9px var(--dark)",
            }}
          />
          <br />
          <Skeleton
            variant="text"
            height={130}
            width={"20%"}
            style={{
              minWidth: "150px",
              borderRadius: "var(--br)",
              boxShadow: "-6px 9px var(--dark)",
            }}
          />
          <br />
          <Skeleton
            variant="text"
            height={130}
            width={"30%"}
            style={{
              minWidth: "200px",
              borderRadius: "var(--br)",
              boxShadow: "-6px 9px var(--dark)",
            }}
          />
          <br />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageWrapper;
