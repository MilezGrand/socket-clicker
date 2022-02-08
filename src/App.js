import axios from "axios";
import { useEffect, useState } from "react";
import socket from './socket';

function App() {
  let [score, setScore] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/getscore').then(({ data }) => {setScore(data)})
    socket.on('update', ( mainScore) => {
      setScore(mainScore)
    });
  }, []);
  
  const clickHandler = async () => {
    setScore(score + 1);
    socket.emit('scoreChanged', score);
  }

  window.socket = socket;

  return (
    <div className="App">
      <h1>{score}</h1>
      <h1>Артуриков</h1>
      <img src="/img/artur.png" onClick={clickHandler} width="500"/>    
    </div>
  );
}

export default App;
