const ChatsList = (props) =>{
    const onClick = (item) =>{
        console.log('clicked: ', item.title);
        props.selectChat(item.title, item.users.length);
    }
    return(
        <div>
            {props.chats.map((item)=>
                <div className="oneChat" onClick={() => onClick(item)}>
                    <span className="chatName">{item.title}</span>
                    {/* <span className="usersNumber">Users : {item.users.length}</span> */}
                </div>)}
        </div>
    )
}

export default ChatsList;