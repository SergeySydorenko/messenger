import Register from './Register';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Messenger from './Messenger';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const Logged = (token) =>{

    console.log("get token:", token);
    // document.cookie = `token=${token}`;
    setCookie('token', token, {secure: true, 'max-age': 3600});
    console.log('cookies : ', getCookie('token'))
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
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  return (
    <div className="App">
      
        {getCookie('token') ? 
          <Messenger/> : 
          (<Router>
            <div className="registerOrLogin">
              Please 
                <Link to="/login" className="routerLinks"> login </Link> 
              or
                <Link to="/register" className="routerLinks"> register </Link> 
              to access messenger.
            </div>
            <Switch>
              <Route exect path="/login">
                <Login logged={Logged}/>
              </Route>
              <Route exect path="/register">
                <Register/>
              </Route> 
            </Switch>
          </Router>)
        }
    </div>
  );
}

export default App;
