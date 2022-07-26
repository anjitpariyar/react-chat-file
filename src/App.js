import "./App.css";
import React, { useState, useEffect } from "react";
import Personalized from "./Components/Personalized";

import db from "./Components/Firebase/Firebase";
import MessageWrapper from "./Components/MessageWrapper";
import Welcome from "./Components/Welcome";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function App() {
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
    timestamp: "",
  });

  const { text } = data;
  const [theme, setTheme] = useState("purple");
  const handleChange = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };
  // user location
  const getUserGeoLocation = () => {
    fetch("http://ip-api.com/json/")
      .then((response) => response.json())
      .then((data) => {
        handleChange("nameDevice", data?.query || "NA");
        handleChange("username", data?.query);
        handleChange("fullLocation", {
          ip: data?.query,
          city: data?.city,
          country_name: data?.country,
          latitude: data?.lat,
          longitude: data?.lon,
        });
        if (localStorage.getItem("name")) {
          handleChange("nameDevice", localStorage.getItem("name"));
        } else if (data?.query) {
          localStorage.setItem("name", `${data?.query}`);
        } else {
          localStorage.setItem("name", "unknown");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // add location
  useEffect(() => {
    getUserGeoLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // for theme change
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
      document.querySelector("body").removeAttribute("class");
      document.querySelector("body").classList.add(theme);
    } else {
      localStorage.setItem("theme", `${theme}`);
    }
  }, [theme]);

  // submit me
  const send = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "chat12"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    handleChange("text", "");
  };

  return (
    <div className="App">
      <div className="top--part">
        <section className="section__rule">
          <Personalized theme={(theme) => setTheme(theme)} askTheme={theme} />
          <MessageWrapper />
          <form method="" action="#!" onSubmit={send}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="write your message"
                value={text}
                onChange={(event) => handleChange("text", event.target.value)}
                required
                autoFocus
                // autoComplete={text.toString()}
              />

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
          </form>
        </section>
      </div>

      <Welcome />
    </div>
  );
}

export default App;
