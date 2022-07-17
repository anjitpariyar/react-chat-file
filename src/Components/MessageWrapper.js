import React, { useState, useEffect, useRef, useMemo } from "react";

// import Messages from "./Messages";
import Skeleton from "@mui/material/Skeleton";

import db from "./Firebase/Firebase";
import { useInView } from "react-intersection-observer";
import "firebase/compat/firestore";

const MessageWrapper = () => {
  //for first 20 message at the start
  const [message, setMessage] = useState([]);

  // for scrolled up image
  const [messageAdded, setAddedMessage] = useState([]);

  // combining message and messageAdded
  const totalMessage = useMemo(() => [...messageAdded], [messageAdded]);

  // to know how many total message in the data base
  const [countMessage, setCountMessage] = useState([]);

  const [pageSize, setPageSize] = useState(0);

  // firebase Ref

  // state data for starting 20 data
  useEffect(() => {
    console.log("anyone call me , i am a starter?");
    db.collection("chat12")
      .orderBy("timestamp", "asc")
      .limitToLast(20)
      .onSnapshot((snapshot) => {
        setAddedMessage(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

    // total message in the data base
    db.collection("chat12")
      .get()
      .then((snap) => {
        setCountMessage(snap.size);
        console.log("snap size ", snap.size);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // added data when scrolling is update
  useEffect(() => {
    console.log("pageSize", pageSize);
    if (pageSize > 0) {
      // db.collection("chat12")
      //   .orderBy("timestamp", "asc")
      //   .limitToLast(pageSize * 20 + 20)
      //   .onSnapshot((snapshot) => {
      //     let tempMessage = [
      //       snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
      //     ];
      //     tempMessage = tempMessage.flat();
      //     setAddedMessage([...new Set([...tempMessage])]);
      //   });
      db.collection("chat12")
        .orderBy("timestamp", "asc")
        .limitToLast(pageSize * 20 + 20)
        .get()
        .then((doc) => {
          console.log(doc);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  // scroll into view
  useEffect(() => {
    // if pagesige is 0 then its a first page
    console.log("pageSize for message added", pageSize);
    if (pageSize === 0) {
      scrollToBottom();
    } else {
      // scrollToTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageAdded]);

  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  // const scrollToTop = () => {
  //   if (chatRef?.current?.children[21])
  //     chatRef.current.children[21].scrollIntoView({ behavior: "auto" });
  // };

  const messagesEndRef = useRef(null);

  // down to bottom whenever data changed only on message change
  // useEffect(scrollToBottom, [message]);
  // useEffect(() => console.log("messageAdded", messageAdded), [messageAdded]);

  // detect the view of loader
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setPageSize((pageSize) => pageSize + 1);
    }
    // chatRef.current.childNodes[9].scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="chat--wrapper">
      {totalMessage.length > 0 ? (
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
            {/* {totalMessage.map(({ id, data }) => (
              <Messages key={id} {...data} />
            ))} */}
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
