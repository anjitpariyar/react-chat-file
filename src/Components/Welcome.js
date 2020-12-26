import {React, useEffect, useState, useRef} from 'react';
import  './Welcome.css';

function Welcome(props) {
     const [count, setCount] =useState(6);
     const timerToClearSomewhere = useRef(null) 
     const welcomeRef = useRef(null);

     
     useEffect(() => {
          
          timerToClearSomewhere.current = setInterval(() => {
               setCount(count => count - 1)
          }, 1000);
          
          
          return () => clearInterval(timerToClearSomewhere.current);
          
     }, [ ] );
     
     useEffect(() => {
          if(count < 1){
               clearInterval(timerToClearSomewhere.current);
               welcomeRef.current.classList.add('active')
          }
     }, [count])
     
     return (
          <section className="welcome--part" ref={welcomeRef}>
          <div className="section__rule">
          <div className="Wrapper">
          <div className="image">
          <img src="./gallery/03.png" />
          </div>
          <h2 className="section__title">None will know who you are
          but <br/> don't kill anyone</h2>
          <p>IP address and location stored in database for safety purpose. welcome to use vpn . for advice you can dm me in  insta @limbo_anj   
          
          </p>
          </div>
          
          <div className="widget">
          <h3 className=" section__title--bg">Start In</h3>
          <h3 className="section__title">{count}</h3>
          </div>
          </div>
          
          </section>
          );
     }
     
     export default Welcome;