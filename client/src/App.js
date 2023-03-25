import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Component/Chat';

const socket = io.connect("http://localhost:4500")


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
    <div className="App">
      {!showChat ? <div>
        <h3>Please join chat</h3>
        <input type="text" placeholder='Enter Name' onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder='Room Id...' onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Join a room</button>
      </div> : <Chat socket={socket} username={userName} room={room} />
      }
    </div>
  );
}

export default App;
