import { useEffect, useRef, useState } from "react";
import {io} from "socket.io-client";
import Chat from './Chat';
import axios from 'axios';
import ChatsList from "./ChatsList";
import {Modal, Button} from "antd";
import 'antd/dist/antd.css';
import Select from "./Select";
const socket = io("/");

function Messenger(){
  let config = {
    headers: {
      "x-auth-token": String(getCookie('token'))
    }
  }
  const [myLogin, setMyLogin] = useState();
  const [messageInfo, setMessageInfo] = useState();
  const [messagesClass, setMessagesClass] = useState('messages');
  const [chats, setChats] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chooseName, setChooseName] = useState();
  let chatName = useRef(null);
  let chatMember = useRef(null);
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  useEffect(() => 
    myLogin ?
      null :
      axios.post("http://localhost:5000/auth/login", {}, config).then((res) => {
        setChats(res.data.chats)
        setMyLogin(res.data.userLogin.login)
      }),
    messageInfo ? 
      null :
      axios.get("http://localhost:5000/chat", config).then((res) => 
        setMessageInfo(res.data)),
    chooseName ? null : 
      axios.get('http://localhost:5000/chat/findUser?login=',config).then((res)=>
      {console.log(res.data); 
        setChooseName(res.data);}
      ),[])

    const onSubmit = async (e) =>{
      e.preventDefault();
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
      console.log(socket.id); 
      socket.on('add message', (data) => {
        axios.get("http://localhost:5000/chat", config).then((res) => setMessageInfo(res.data));
      })
    });
    
    const showModal = () => {
      setIsModalVisible(true);
    };
    const select = (selected) => {
      console.log(selected);
      chatMember.current.value = selected;
    }
    const handleOk = () => {
      if(chatName.current.value != '' && chatMember.current.value != ''){

        axios.post('http://localhost:5000/chat/newChat', {
          title: chatName.current.value,
          login: chatMember.current.value
        }, config).then((res) => 
            {
            axios.post("http://localhost:5000/auth/login", {}, config).then((res) => {
              setChats(res.data.chats)
              setMyLogin(res.data.userLogin.login)
        })})
        setIsModalVisible(false);
      }else {alert("Empty chat name or member name!")}
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const onChange = (e) =>{
      axios.get('http://localhost:5000/chat/findUser?login=' + e.target.value,
        config).then((res)=>
          {setChooseName(res.data);})
    }
    return(
      <div className="messengerMain">
          <div className="welcome-and-logout">
            <button className="createChat__button" type='primary' onClick={showModal}>Create new chat</button>
            <h1>Welcome to the CLUB BUDDY</h1>
            <button type="button" onClick={() => deleteCookie('token')}>Log out</button>
          </div>
          <div className="chats">
            <div className="chatsList">
              <Modal title="Create Chat" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="createChat__form">
                  <input 
                  ref={chatName} 
                  placeholder="Chat name" 
                  >
                  </input>
                  <input 
                    ref={chatMember} 
                    placeholder="Invite" 
                    onChange={onChange}
                  ></input>
                  <Select name={chooseName} select={select}/>
                </div>
              </Modal>
              {chats ? <ChatsList chats={chats}/> : null}
            </div>
            <div className={messagesClass}>
              {messageInfo ? messageInfo.map((item, index, array) => 
                <Chat login={item.author.login} text={item.text} time={item.date} myLogin={myLogin}/>) : 
                <span>Currently there are no messages!</span>
              }
            </div>
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