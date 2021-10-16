import { useEffect, useState } from "react";
import {io} from "socket.io-client";
import Chat from './Chat';
import axios from 'axios';
const socket = io("/");

function Messenger(){
  let [myLogin, setMyLogin] = useState();
  let [messageInfo, setMessageInfo] = useState();
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  let config = {
    headers: {
      "x-auth-token": String(getCookie('token'))
    }
  }

  // const showMessages = (data) =>{
  //   data.map((item, index) => setMessageInfo(...messageInfo, {
  //     date: item.date,
  //     author: item.author.login,
  //     messageText: item.text
  //     }))
  //   console.log(messageInfo);
  // }

  useEffect(() => 
  myLogin ?
    null :
    axios.post("http://localhost:5000/auth/login", {}, config).then((res) => setMyLogin(res.data.login)),
  messageInfo ? 
    null :
    axios.get("http://localhost:5000/chat", config).then((res) => 
      setMessageInfo(res.data
      )),
  [])
  // axios.get("http://localhost:5000/chat", config).then((res) => 
  // setMessageInfo(res.data
  // ))
    const onSubmit = async (e) =>{
    e.preventDefault();
    // console.log(e.target[0].value);
    // let response = await axios.post("http://localhost:5000/auth/login", {}, config)
    // console.log(response);
    if(e.target[0].value != ''){
      socket.emit('send message', {token: getCookie('token'), message: e.target[0].value});
      e.target[0].value = '';
    }else {alert("Empty message!")}
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

    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      socket.on('add message', (data) => {
        axios.get("http://localhost:5000/chat", config).then((res) => setMessageInfo(res.data));
      })
    });
    return(
      <div className="messengerMain">
          <div className="welcome-and-logout">
            <h1>Welcome to the CLUB BUDDY</h1>
            <button type="button" onClick={() => deleteCookie('token')}>Log out</button>
          </div>
          <div className="messages">
            {messageInfo ? messageInfo.map((item, index, array) => 
              <Chat login={item.author.login} text={item.text} time={item.date} myLogin={myLogin}/>) : 
              <span>Currently there are no messages!</span>
            }
          </div>
          <form 
            className="formChat"
            onSubmit={onSubmit}
          >
            <div className="formChat__login">{myLogin} (You)</div>
            <input type="text" placeholder="Write here" className="messegeInput"></input>
            <button type="submit" className="formChat_button">Send feetpics</button>
          </form>
      </div>
    )
}

export default Messenger;