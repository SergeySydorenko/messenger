const Chat = (props) => {
    if(props.login === props.myLogin){
      return(
      <div className="Mine">
        <div className = "oneMessage">
          <div className = "loginText">
            <span className = "Login">{props.login}:</span>
            <div className = "Text">{props.text}</div>
          </div>
          <span>{props.time}</span>
        </div>
      </div>
    )}else {
      return(
        <div className="others">
          <div className = "oneMessage">
          <div className = "loginText">
            <span className = "Login">{props.login}:</span>
            <div className = "Text">{props.text}</div>
          </div>
            <span>{props.time}</span>
          </div>
        </div>
      )
    }
  }

  export default Chat;