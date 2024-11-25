import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Input from './components/Input/Input';
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [score, setScore] = useState({})
  const [scorePanel, setScorePanel] = useState([])

  useEffect(() => {
    const newSocket = io("http://localhost:3000/");
    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("Connected to server with ID:", newSocket.id);
    })

    newSocket.on("scoreBoard", (scoreBoard) => {
      setScorePanel(scoreBoard);
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleInput = (event) => {
    let { name, value } = event.target
    let obj = { [name]: value }

    setScore((prev) => ({ ...prev, ...obj }))
  }

  const sendScores = () => {
    console.log(score)
    socket.emit("score", score)
  }

  return (
    <>
      <h1>React Multiplayer Dashboard</h1>
      <Input
        name="name"
        handleInput={handleInput}
        placeholder="Enter your name"
        className="input-field"
      />

      <Input
        name="score"
        handleInput={handleInput}
        placeholder="Enter your highscore"
        className="input-field"
      />

      <button onClick={sendScores}>
        Submit score
      </button>



      {scorePanel.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scorePanel.map((value, index) => (
              <tr key={index}>
                <td>{value?.name}</td>
                <td>{value?.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No scores submitted yet.</p>
      )}



    </>
  )
}

export default App
