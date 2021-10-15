import Register from './Register';
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  let isLogged;
  let messenger;
  return (
    <div className="App">
      <header className="App-header">
        {isLogged ? 
          messenger : 
          (<Router>
            <div className="registerOrLogin">Please 
            <Link to="/login" className="routerLinks"> login </Link> 
            or
            <Link to="/register" className="routerLinks"> register </Link> 
            to access messenger.</div>
            <Switch>
              <Route exect path="/login">
                <Login/>
              </Route>
              <Route exect path="/register">
                <Register/>
              </Route> 
            </Switch>
          </Router>)
        }
      </header>
    </div>
  );
}

export default App;
