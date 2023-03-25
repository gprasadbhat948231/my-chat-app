import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Component/Chat';
import "./chat.css"
const socket = io.connect("https://authenti.onrender.com")


function App() {
  const [userName, setUsername] = useState("")
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true);
    }
  }
  return (
    <div className='chat-container'>
      {!showChat ? <div>
        <h3>Please join chat</h3>
        <div className='user-input-container'>
          <input className="input-user" type="text" placeholder='Enter Name' onChange={(e) => setUsername(e.target.value)} />
          <input className="input-user" type="text" placeholder='Room Id...' onChange={(e) => setRoom(e.target.value)} />
          <button className="submit-btn" onClick={joinRoom}>Join a room</button>
        </div>
      </div> : <Chat socket={socket} username={userName} room={room} />
      }
    </div>
  );
}

export default App;
