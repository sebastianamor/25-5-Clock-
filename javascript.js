function App() {
  const [count, setCount] = React.useState(5); // Break Length
  const [counta, setCounta] = React.useState(25); // Session Length
  const [timeLeft, setTimeLeft] = React.useState(1500); // 1500 segundos = 25:00
  const [isRunning, setIsRunning] = React.useState(false); // Controlar el estado del temporizador
  const [isSession, setIsSession] = React.useState(true); // true = Session, false = Break
  const timerRef = React.useRef(null); // Referencia para el intervalo del temporizador

   
  // Función para formatear el tiempo en mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Iniciar o pausar el temporizador
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            // Cambiar entre sesión y descanso
            if (isSession) {
              // Cambiar a descanso
              setIsSession(false);
              return count * 60; // Reiniciar con el tiempo de descanso
            } else {
              // Cambiar a sesión
              setIsSession(true);
              return counta * 60; // Reiniciar con el tiempo de sesión
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  // Restablecer el temporizador
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsSession(true); // Reiniciar en modo sesión
    setCount(5); // Restablecer Break Length a 5
    setCounta(25); // Restablecer Session Length a 25
    setTimeLeft(1500); // Restablecer el temporizador a 25:00
  };

  return (
    <div>
      {/* Sección Break */}
      <div id="break-label">
        Break Length
        <div id="break-length">{count}</div>
        <button
          id="break-increment"
          onClick={() => setCount((prev) => Math.min(prev + 1, 60))}
        >
          Up
        </button>
        <button
          id="break-decrement"
          onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
        >
          Down
        </button>
      </div>

      {/* Temporizador */}
      <div id="timer-label">
        {isSession ? "Session" : "Break"} {/* Mostrar "Session" o "Break" */}
        <div id="time-left">{formatTime(timeLeft)}</div>
        <button id="start_stop" onClick={toggleTimer}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>

      {/* Sección Session */}
      <div id="session-label">
        Session Length
        <div id="session-length">{counta}</div>
        <button
          id="session-increment"
          onClick={() => {
            setCounta((prev) => Math.min(prev + 1, 60));
            if (isSession) {
              setTimeLeft((counta + 1) * 60); // Actualiza el tiempo restante si está en sesión
            }
          }}
        >
          Up
        </button>
        <button
          id="session-decrement"
          onClick={() => {
            setCounta((prev) => Math.max(prev - 1, 1));
            if (isSession) {
              setTimeLeft((counta - 1) * 60); // Actualiza el tiempo restante si está en sesión
            }
          }}
        >
          Down
        </button>
      </div>
    </div>
  );
}

// Renderizar el componente en el DOM
ReactDOM.render(<App />, document.getElementById("root"));
