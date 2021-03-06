import axios from "axios";
import {
    BrowserRouter as Router,
    useHistory
  } from "react-router-dom";

  
const Login = ({logged}) => {
    
    let history = useHistory();



    let url = "http://localhost:5000/auth"
    const onFinish = (event) =>{
        event.preventDefault();
        let user = {
            login: event.target[0].value,
            password: event.target[1].value,
        }
        console.log(user)
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify(user)
        //   }).then((response) => response.json).then((result) => console.log(result))
        axios.post(url, {
            login: event.target[0].value,
            password: event.target[1].value
          })
          .then(function (response) {
            console.log(response);
            if(response.data.token != undefined){
                history.push("/");
                logged(response.data.token);
            }
          })
    }
    
    return(
        <form 
            className="formLogin" 
            name="registration" 
            method="post" 
            onSubmit={onFinish}>
            <input 
                placeholder="Username" 
                className="formLogin__input" 
                name='username' id="username" 
                type="text"
                required></input>
            <input 
                placeholder="Password" 
                className="formLogin__input" 
                name='password' 
                id="password" 
                type="password"
                required></input>
            <button type="submit" className="formLogin__button">
                Login
            </button>
        </form>
    )
}

export default Login;