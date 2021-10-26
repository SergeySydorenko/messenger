const ChatsList = (props) =>{
    const onClick = (item) =>{
        console.log('clicked: ', item.title)
    }
    return(
        <div>
            {props.chats.map((item)=>
                <div className="oneChat" onClick={() => onClick(item)}>
                    <span>{item.title}</span>
                    <span>Users : {item.users.length}</span>
                </div>)}
        </div>
    )
}

export default ChatsList;