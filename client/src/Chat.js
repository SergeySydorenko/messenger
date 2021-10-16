const Chat = (props) => {
    if(props.login === props.myLogin){
      return(
      <div className="Mine">
        <div className = "oneMessage">
          <span>{props.time}</span>
          <span>{props.login}</span>
          <div>{props.text}</div>
        </div>
      </div>
    )}else {
      return(
        <div className="others">
          <div className = "oneMessage">
            <span>{props.time}</span>
            <span>{props.login}</span>
            <div>{props.text}</div>
          </div>
        </div>
      )
    }
  }

  export default Chat;