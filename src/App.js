import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Messages from "./Components/Messages";
import Personalized from "./Components/Personalized";

import db from "./Components/Firebase/Firebase";
import firebase from "firebase";
// import FlipMove from "react-flip-move";

// import Welcome from "./Components/Welcome";

function App() {
  const [message, setMessage] = useState([]);

  const [data, setData] = useState({
    text: "",
    username: "",
    nameDevice: "",
    fullLocation: {
      ip: "",
      city: "",
      country_name: "",
      latitude: "",
      longitude: "",
    },
    reply: "",
    imageurl: "",
  });

  const { text, username, nameDevice, fullLocation, reply, imageurl } = data;

  // const [totalMessage, setTotalMessage] = useState();

  const [theme, setTheme] = useState("purple");
  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const getUserGeoLocation = () => {
    const request = new XMLHttpRequest();

    request.open(
      "GET",
      "https://api.ipdata.co/?api-key=d3020161f66bc18d54299f1f323a378efac4f60876f0ebd4ae37df67"
    );

    request.setRequestHeader("Accept", "application/json");

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        // console.log(this.responseText);
        const data = this.responseText;
        setData("name", data?.ip);
        setData("fullLocation", {
          ip: data?.ip,
          city: data?.city,
          country_name: data?.country_name,
          latitude: data?.latitude,
          longitude: data?.longitude,
        });
        if (localStorage.getItem("name")) {
          setData("nameDevice", localStorage.getItem("name"));
          // console.log('get')
        } else {
          localStorage.setItem("name", `${data?.ip}`);
          // console.log('I am setting')
        }
      }
    };

    request.send();
  };

  useEffect(() => {
    getUserGeoLocation();

    db.collection("chat12")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessage(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        // setTotalMessage(snapshot.docs.length);
      });
    // db.collection("chat12")
    //   .get()
    //   .then(function (querySnapshot) {
    //     console.log(querySnapshot);
    //   });
  });

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
      document.querySelector("body").removeAttribute("class");
      document.querySelector("body").classList.add(theme);
    } else {
      localStorage.setItem("theme", `${theme}`);
    }
  }, [theme]);

  const messagesEndRef = useRef(null);
  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  // };

  // useEffect(scrollToBottom, [message]);

  const send = (e) => {
    e.preventDefault();
    db.collection("chat12").add({
      username: username,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      fullLocation: fullLocation,
      nameDevice: nameDevice,
      reply: reply,
      imageurl: imageurl,
    });
    handleChange("name", "");
  };

  return (
    <div className="App">
      <div className="top--part">
        <section className="section__rule">
          <Personalized theme={(theme) => setTheme(theme)} askTheme={theme} />

          <div className="chat--wrapper">
            {/* <FlipMove> */}
            {message.map(({ id, data }) => (
              <Messages key={id} {...data} />
            ))}
            {/* </FlipMove> */}

            <div ref={messagesEndRef} />
          </div>

          <form method="" action="#!">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="write your message"
                value={""}
                // onChange={(event) => handleChange("text", event.target.value)}
                required
                autoFocus
                // autoComplete={text.toString()}
              />
              <button onClick={send} type="submit" disabled={!text}>
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
          </form>
        </section>
      </div>

      {/* <Welcome /> */}
    </div>
  );
}

export default App;
