import { useEffect, useState } from "react";
import {io} from "socket.io-client";
import Chat from './Chat';
import axios from 'axios';
const socket = io("/");

function Messenger(){
  let [myLogin, setMyLogin] = useState();
  let [messageInfo, setMessageInfo] = useState();

  socket.on("connect", () => {console.log(socket.connected)});
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
    axios.get("http://localhost:5000/chat", config).then((res) => setMessageInfo(res.data))
  ,[])

    const onSubmit = async (e) =>{
    e.preventDefault();
    // console.log(e.target[0].value);
    // let response = await axios.post("http://localhost:5000/auth/login", {}, config)
    // console.log(response);
    if(e.target[0].value != ''){
      socket.emit('send message', {token: getCookie('token'), message: e.target[0].value});
      console.log(e.target[0].value);
      e.target[0].value = '';
    }else {alert("Empty message!")}
    }

    socket.on('add message', (data) => {
      console.log(data.message);
      // messageInfo[Array.length(messageInfo)+1] = data.message;
      // setMessageInfo(...messageInfo, data.message);
      setMessageInfo();
      axios.get("http://localhost:5000/chat", config).then((res) => setMessageInfo(res.data));
    })

    // const getMessage = () => {
    //   if(messageInfo.author === myLogin){
    //     return(
    //     <div className="Mine">
    //       <div className = "oneMessage">
    //         <span>{messageInfo.date}</span>
    //         <span>{messageInfo.author}</span>
    //         <div>{messageInfo.messageText}</div>
    //       </div>
    //     </div>
    //   )}else {
    //     return(
    //       <div className="others">
    //         <div className = "oneMessage">
    //           <span>{messageInfo.date}</span>
    //           <span>{messageInfo.author}</span>
    //           <div>{messageInfo.messageText}</div>
    //         </div>
    //       </div>
    //     )
    //   }
    // }
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
    // const values = Object.values(messageInfo ? messageInfo : {});
      
    // values.forEach(value => {
    //   console.log(value);
    // });
    let check;
    // messageInfo ? Array.from(messageInfo) : null;
    console.log('object is', messageInfo);
    // console.log('check is', Array.from(messageInfo));
    // console.log(name);
    return(
      <div className="messengerMain">
          <div className="welcome-and-logout">
            <h1>Welcome to the Messenger</h1>
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
            <span>{myLogin} (You)</span>
            <input type="text" placeholder="Write here" className="messegeInput"></input>
            <button type="submit" className="formChat_button">Send feetpics</button>
          </form>
      </div>
    )
}

export default Messenger;