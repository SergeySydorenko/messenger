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

function App() {
  let [isLogged, setIsLogged] = useState(false);
  const Logged = () =>{
    setIsLogged = true;
  }
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
