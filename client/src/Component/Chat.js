import React, { useEffect, useState } from 'react'
import "../chat.css"
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentmsg] = useState("")
  const [msgList, setMsglist] = useState([])
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };
      await socket.emit("send_message", messageData);
      setMsglist((list) => [...list, messageData])
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsglist((list) => [...list, data])
    })
  }, [socket])
  return (
    <div className='chat-box'>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {msgList.map((messageContent) => (
          <div className={username === messageContent.author ? "you" : "other"}>
            <p>{messageContent.message}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input className='chat-type' type={'text'} placeholder="hey!!!!!" onChange={(e) => setCurrentmsg(e.target.value)} />
        <button className='send-btn' onClick={sendMessage} >&#9658;</button>
      </div>
    </div>
  )
}

export default Chat