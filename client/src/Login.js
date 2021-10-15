

function Login(){
    let url = "http://localhost:3000/"
    const onFinish = async (event) =>{
        let user = {
            username: event.target[0].value,
            password: event.target[1].value,
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
        event.preventDefault();
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