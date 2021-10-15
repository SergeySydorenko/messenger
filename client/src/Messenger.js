import {io} from "socket.io-client";

const socket = io("/");

function Messenger(){

  socket.on("connect", () => {console.log(socket.connected)});
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const onClick = () =>{
    socket.emit('send message', {token: getCookie('token'), message: 'Hello'});
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
    let messagas = false;
    return(
      <div className="messengerMain">
          <div className="welcome-and-logout">
            <h1>Welcome to the Messenger</h1>
            <button type="button" onClick={() => deleteCookie('token')}>Log out</button>
          </div>
          <div className="messages">
            {messagas ? null : <span>Currently there are no messages!</span>}
          </div>
          <form className="formChat">
            <input type="text" placeholder="Write here" className="messegeInput"></input>
            <button type="button" className="formChat_button" onClick={onClick}>Send feetpics</button>
          </form>
      </div>
    )
}

export default Messenger;