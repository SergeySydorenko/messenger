import axios from "axios";

function Register(){
    let url = "http://localhost:5000/reg"
    const onFinish = async (event) =>{
        let user = {
            email: event.target[0].value,
            username: event.target[1].value,
            password: event.target[2].value
        }
        console.log(user)
        // let response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify(user)
        //   });
        // console.log(response);
        axios.post(url, {
            email: event.target[0].value,
            login: event.target[1].value,
            password: event.target[2].value
          })
          .then(function (response) {
            console.log(response.data.errors[0]);
            if(response.data.errors[0] != undefined){
                alert('ok');
            }else{
                alert(response.data.errors[0]);
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