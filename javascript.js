function App() {
  const [count, setCount] = React.useState(5); // Break Length
  const [counta, setCounta] = React.useState(25); // Session Length
  const [timeLeft, setTimeLeft] = React.useState(1500); // 1500 segundos = 25:00
  const [isRunning, setIsRunning] = React.useState(false); // Estado del temporizador
  const [isSession, setIsSession] = React.useState(true); // true = Session, false = Break
  const timerRef = React.useRef(null); // Referencia del temporizador
  const audioRef = React.useRef(null); // Referencia del sonido

  // Función para formatear el tiempo en mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Función para reproducir el beep
  const playBeep = () => {
    audioRef.current.play();
  };

  // Función para cambiar entre sesión y descanso
  const switchPhase = () => {
    playBeep(); // 🔊 Sonido cuando llega a 00:00
    setIsSession((prev) => !prev); // Alternar entre sesión y descanso
    setTimeLeft((prev) => (isSession ? count * 60 : counta * 60)); // Asignar el nuevo tiempo
  };

  // Iniciar o pausar el temporizador
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            switchPhase(); // Cambiar entre sesión y descanso
            return prevTime; // Evitar valores negativos
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
    setIsSession(true);
    setCount(5);
    setCounta(25);
    setTimeLeft(1500);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div id="parent"  >
      {/* Sección Break */}
      <div id="break-label">
        Break Length
        <div id="break-length">{count}</div>
        <button id="break-increment" onClick={() => setCount((prev) => Math.min(prev + 1, 60))}>
          Up
        </button>
        <button id="break-decrement" onClick={() => setCount((prev) => Math.max(prev - 1, 1))}>
          Down
        </button>
      </div>

      {/* Temporizador */}
      <div id="timer-controls">
      <div id="timer-label">{isSession ? "Session" : "Break"}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
        <button id="start_stop" onClick={toggleTimer}>
        <span class="play-button play-button-before"></span>
        <span class="play-button play-button-after"></span>
        
        
        </button>
      <button id="reset" onClick={resetTimer}>リセット</button>
      </div>
      {/* Sección Session */}
      <div id="session-label">
        Session Length
        <div id="session-length">{counta}</div>
        <button
          id="session-increment"
          onClick={() => {
            const newCounta = Math.min(counta + 1, 60);
            setCounta(newCounta);
            if (isSession) setTimeLeft(newCounta * 60);
          }}
        >
          Up
        </button>
        <button
          id="session-decrement"
          onClick={() => {
            const newCounta = Math.max(counta - 1, 1);
            setCounta(newCounta);
            if (isSession) setTimeLeft(newCounta * 60);
          }}
        >
          Down
        </button>
      </div>

      {/* 🎵 Elemento de audio para el beep */}
      <audio id="beep" ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"></audio>
    </div>
  );
}

// Renderizar el componente en el DOM
ReactDOM.render(<App />, document.getElementById("root"));