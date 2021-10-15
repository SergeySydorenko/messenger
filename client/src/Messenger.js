import { useState } from "react";
import {io} from "socket.io-client";

const socket = io("/");

function Messenger(){

  let [messageInfo, setMessageInfo] = useState();

  socket.on("connect", () => {console.log(socket.connected)});
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    // console.log(e.target[0].value);
    if(e.target[0].value != ''){
      socket.emit('send message', {token: getCookie('token'), message: e.target[0].value});
      console.log(e.target[0].value);
      e.target[0].value = '';
    }else {alert("Empty message!")}
    }
    socket.on('add message', (data) => {
      // добавить елемент с сообщением {data.message}
      console.log(data);
      setMessageInfo({
        date: data.message.date,
        author: data.message.author.login,
        messageText: data.message.text
        });
    })
    const getMessage = () => {
      
      if(messageInfo.author === myLogin){
        return(
        <div className="Mine">
          <div className = "oneMessage">
            <span>{messageInfo.date}</span>
            <span>{messageInfo.author}</span>
            <div>{messageInfo.messageText}</div>
          </div>
        </div>
      )}else {
        return(
          <div className="others">
            <div className = "oneMessage">
              <span>{messageInfo.date}</span>
              <span>{messageInfo.author}</span>
              <div>{messageInfo.messageText}</div>
            </div>
          </div>
        )
      }
    }
    function deleteCookie(name) {
        setCookie(name, "", {
        'max-age': -1
        })
        window.location.reload();
    }
    function setCookie(name, value, options = {}) {

        options = {
          path: '/',
          // при необходимости добавьте другие значения по умолчанию
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
      
        document.cookie = updatedCookie;
      }
    // console.log(name);
    return(
      <div className="messengerMain">
          <div className="welcome-and-logout">
            <h1>Welcome to the Messenger</h1>
            <button type="button" onClick={() => deleteCookie('token')}>Log out</button>
          </div>
          <div className="messages">
            {messageInfo ? getMessage() : <span>Currently there are no messages!</span>}
            {/* {getMessage() ?? } */}
          </div>
          <form 
            className="formChat"
            onSubmit={onSubmit}
          >
            <input type="text" placeholder="Write here" className="messegeInput"></input>
            <button type="submit" className="formChat_button">Send feetpics</button>
          </form>
      </div>
    )
}

export default Messenger;