import React, { useEffect, useState } from 'react'

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentmsg] = useState("")
  const [msgList,setMsglist]=useState([])
  const sendMessage = async() => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };
      await socket.emit("send_message",messageData);
      setMsglist((list)=>[...list,messageData])
    }
  }

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMsglist((list)=>[...list,data])
    })
  },[socket])
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messagelist.map ((messageContent)=>(
          <div>
            <div>
              <p>{messageContent.message}</p>
            </div>
              <p>{messageContent.time}</p>
              <p>{messageContent.author}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input type={'text'} placeholder="hey!!!!!" onChange={(e) => setCurrentmsg(e.target.value)} />
        <button onClick={sendMessage} >&#9658;</button>
      </div>
    </div>
  )
}

export default Chat