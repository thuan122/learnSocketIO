import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import './App.css'

function App() {
  const socket = io("http://localhost:3000/");

  const connectSocket = () => {
    socket.on("connection", (socket) => {
      console.log(socket)
    })
  }

  useEffect(() => {
    connectSocket()
  }, []);

  return (
    <>
      <h1>React Multiplayer Dashboard</h1>
    </>
  )
}

export default App
