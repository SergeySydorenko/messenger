import Register from './Register';
import { useState } from 'react';
import Login from './Login';
import Messenger from './Messenger';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { io } from "socket.io-client";

function App() {
  let [isLogged, setIsLogged] = useState(false);
  const Logged = () =>{
    setIsLogged = true;
  }
  // const socket = io("http://localhost:5000/auth", {
  //   reconnectionDelayMax: 10000,
  //   auth: {
  //     token: "123"
  //   },
  //   query: {
  //     "my-key": "my-value"
  //   }
  // });

  return (
    <div className="App">
      
        {isLogged ? 
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
