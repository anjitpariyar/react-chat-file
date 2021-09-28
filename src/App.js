import './App.css';
import React, { useState, useEffect, useRef} from 'react'
import Messages from './Components/Messages'
import Personalized from './Components/Personalized'

import db from './Components/Firebase/Firebase'
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

import Welcome from './Components/Welcome'



function App() {
  
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [nameDevice, setNameDevice] = useState('');
  
  const [location, setLocation] = useState([]);
  
  const [timestamp, setTimestamp] = useState('');
  const [message, setMessage] = useState([]);
  const [notification, setNotification] = useState();
  const [totalMessage, setTotalMessage] = useState();

  
  
  const [askNotification, setAskNotification] = useState(false);
  const [askAudio, setAskAudio] = useState(false);

  const [theme, setTheme] = useState('purple');

  
  
  const getUserGeoLocation = () =>{
    fetch("https://geolocation-db.com/json/1a811210-241d-11eb-b7a9-293dae7a95e1")
    .then( response => response.json() )
    .then( data => {
      setName(data.IPv4)
      setLocation(data)
      if (localStorage.getItem('name')){
        setNameDevice(localStorage.getItem('name'))
        // console.log('get')
      }
      else{
        localStorage.setItem('name', `${data.IPv4}`);
        // console.log('I am setting')
      }
      
    })
    
    
    
  }
  
  
  
  useEffect(() => {
    db.collection("chat12")
    .orderBy("timestamp", "asc")
    .onSnapshot(snapshot => {
      setMessage(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
      setTotalMessage(snapshot.docs.length)
    })
    db.collection('chat12').get().then(function (querySnapshot) {
      setNotification(querySnapshot.size);
    });
    
  }, [])
  
  useEffect(() => {
    getUserGeoLocation();
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'))
      document.querySelector('body').removeAttribute("class");
      document.querySelector('body').classList.add(theme)
      console.log(theme)

    }
    else {
      localStorage.setItem('theme', `${theme}`);
    }
  }, [])
  
  
  
  useEffect(() => {
    // Notification.permission()
    if(Notification.permission === 'default') {
      Notification.requestPermission().then(permission => { 
        if (permission === 'granted'){
          setAskNotification(true)
        }
        else  {
          setAskNotification(false)
        }
      }) 
    }
    else if (Notification.permission === 'granted') {
      setAskNotification(true)

    }
    else{
      setAskNotification(false)
    }


  }, [])
  
  
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };


  useEffect(scrollToBottom, [message]);
  
  
  const send= (e)=>{
    e.preventDefault()
    db.collection('chat12').add({
      username: name, 
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      fullLocation: location,
      nameDevice: nameDevice,
    })
    setInput('');
  }
  
  
  
  return (
    <div className="App">
    <div className="top--part">
    <section className="section__rule">
          <Personalized notification={askNotification => setAskNotification(askNotification)} askNotification={askNotification} audio={audio => setAskAudio(audio)} askAudio={askAudio} theme={theme => setTheme(theme)} askTheme = {theme}  />

    <div   className="chat--wrapper">
    <FlipMove>{ 
      message.map(({ id, data }, index) => (
        <Messages key={id} username={data.username} text={data.text} timestamp={data.timestamp} name={name} notification={notification} totalMessage={totalMessage} nameDevice={data.nameDevice} index={index} askNotification={askNotification} askAudio={askAudio}/>
        ))
      }
      </FlipMove>
      
      <div ref={messagesEndRef} />
      </div>
      
      <form method='' action='#!'>
      <div className="form-group">
      <input className="form-control" placeholder="write your message" value={input} onChange={event => setInput(event.target.value)} required autoFocus autoComplete={input.toString()} />
      <button onClick={send} type="submit" disabled={!input}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48.251" height="48.251" viewBox="0 0 48.251 48.251">
      <path id="Path_2" data-name="Path 2" d="M34.338,2.4a1.246,1.246,0,0,1,.257,1.388L20.5,35.5a1.246,1.246,0,0,1-2.285-.017L13.131,23.607,1.254,18.519a1.246,1.246,0,0,1-.015-2.282L32.95,2.143a1.246,1.246,0,0,1,1.385.257Z" transform="translate(23.397 -1.865) rotate(41)"  fillRule="evenodd" />
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
    