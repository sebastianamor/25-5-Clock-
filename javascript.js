function App() {
    const [count, setCount] = React.useState(5);
    const [counta, setCounta] = React.useState(25);
    const [timeLeft, setTimeLeft] = React.useState(1500); // 1500 segundos = 25:00
  
    // Función para formatear el tiempo en mm:ss
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    
    return (
      <div> 
        {/* Sección Break */}
        <div id="break-label">
          Break Length
          <div id="break-length">{count}</div>
          <button
            id="break-increment"
            onClick={() => setCount(count + 1)}
          >
            Up
          </button>
          <button
            id="break-decrement"
            onClick={() => setCount(count - 1)
                     }
          >
            Down
          </button>
        </div>
  
        <div   id="timer-label">"Session"
        <div   id="time-left" >{formatTime(timeLeft)}</div>
         <button  id="start_stop" >star,stop</button>
          <button  id="reset"   >resert</button>
        </div>
  
        {/* Sección Session */}
        <div id="session-label">
          Session Length
          <div id="session-length">{counta}</div>
          <button
            id="session-increment"
            onClick={() => {   setCounta((prev) => Math.min(prev + 1, 60));
                    setTimeLeft((counta + 1) * 60);
                    } }
          >
            Up
          </button>
          <button
            id="session-decrement"
            onClick={() => setCounta(counta - 1)}
          >
            Down
          </button>
        </div>
      </div>
    );
  }
  
  // Renderizar el componente en el DOM
  ReactDOM.render(<App />, document.getElementById("root"));