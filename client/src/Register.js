import axios from "axios";
import {
    BrowserRouter as Router,
    useHistory
  } from "react-router-dom";


function Register(){
    let url = "http://localhost:5000/reg"
    let history = useHistory();

    const onFinish = async (event) =>{
 
        axios.post(url, {
            email: event.target[0].value,
            login: event.target[1].value,
            password: event.target[2].value
          })
          .then(function (response) {
            console.log(response);
            if(response.data.errors != undefined){
                alert(response.data.errors[0].msg);
            }else{
                // axios.post(url, {
                //     login: event.target[0].value,
                //     password: event.target[1].value
                //   })
                //   .then(function (response) {
                //     console.log(response);
                //     if(response.data.token != undefined){
                //         history.push("/");
                //         logged(response.data.token);
                //     }
                //   })
                history.push("/login");
            }
          })
        event.preventDefault();
    }
    
    return(
        <form 
            className="formLogin" 
            name="registration" 
            method="post" 
            onSubmit={onFinish}>
            <input 
                placeholder="Email" 
                className="formLogin__input" 
                name="email" id="email" 
                type="email"
                required></input>
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
                Register
            </button>
        </form>
    )
}

export default Register;