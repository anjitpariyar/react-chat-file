import React, { useState, forwardRef } from 'react';

import messageInc from './messangerecived.mp3';

const Messages = forwardRef( (props, ref) => {
     // console.log(props)
     const { name, username, text, timestamp, notification, totalMessage, index, nameDevice, askNotification, askAudio} = props;
     const isUser = username === name || nameDevice === localStorage.getItem('name');
     let timeNow = null;
     const [notificationText, setNotificationText] = useState(text);
     const [count, setCount] = useState(true);

     
     
     
     const showNotification = () => {
          const notificationXyz = new Notification("Someone just messaged.", {
               body: notificationText,
          })
     }
     
     let audio = new Audio(messageInc)
     audio.volume = 0.1;
     audio.muted=askAudio ;
     
     if(timestamp){
          timeNow = new Date(timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', hour12: true,  minute: '2-digit' })
     }
     if(totalMessage > notification && index === notification && !isUser){
          audio.play() 
          console.log(' audio and notification' + askNotification + ' ' + count)
          if(askNotification && count){
               showNotification()
               setCount(false)
          }
          if (askAudio && count) {
               audio.play();
               setCount(false)
          }
     }
     else{
          // console.log('not play audio')
     }
     
     return (
          
          <div className={isUser ? 'active chatbox-wrapper' : 'unknown chatbox-wrapper'} key={index} >
          <h2>{text} </h2>
          <time>{timeNow}</time>
          </div>
          
          )
     })
     
     export default Messages
     