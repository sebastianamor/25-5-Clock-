function App() {
  const [count, setCount] = React.useState(5); // 休憩時間の長さ
  const [counta, setCounta] = React.useState(25); // セッション時間の長さ
  const [timeLeft, setTimeLeft] = React.useState(1500); // 1500秒 = 25:00
  const [isRunning, setIsRunning] = React.useState(false); // タイマーの状態
  const [isSession, setIsSession] = React.useState(true); // true = セッション, false = 休憩
  const timerRef = React.useRef(null); // タイマーの参照
  const audioRef = React.useRef(null); // サウンドの参照

  // 時間をmm:ss形式にフォーマットする関数
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ビープ音を再生する関数
  const playBeep = () => {
    audioRef.current.play();
  };

  // セッションと休憩を切り替える関数
  const switchPhase = () => {
    playBeep(); // 🔊 00:00になったら音を再生
    setIsSession((prev) => !prev); // セッションと休憩を切り替え
    setTimeLeft((prev) => (isSession ? count * 60 : counta * 60)); // 新しい時間を設定
  };

  // タイマーを開始または一時停止する関数
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            switchPhase(); // セッションと休憩を切り替え
            return prevTime; // 負の値を避ける
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  
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
    <div id="parent">
      {/* 休憩時間のセクション */}
      <div id="break-label">
        休憩時間
        <div id="break-length">{count}</div>
        <button id="break-increment" onClick={() => setCount((prev) => Math.min(prev + 1, 60))}>
          増やす
        </button>
        <button id="break-decrement" onClick={() => setCount((prev) => Math.max(prev - 1, 1))}>
          減らす
        </button>
      </div>

      {/* タイマー */}
      <div id="timer-controls">
        <div id="timer-label">{isSession ? "セッション" : "休憩"}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
        <button id="start_stop" onClick={toggleTimer}>
          <span className="play-button play-button-before"></span>
          <span className="play-button play-button-after"></span>
        </button>
        <button id="reset" onClick={resetTimer}>リセット</button>
      </div>

      {/* セッション時間のセクション */}
      <div id="session-label">
        セッション時間
        <div id="session-length">{counta}</div>
        <button
          id="session-increment"
          onClick={() => {
            const newCounta = Math.min(counta + 1, 60);
            setCounta(newCounta);
            if (isSession) setTimeLeft(newCounta * 60);
          }}
        >
          増やす
        </button>
        <button
          id="session-decrement"
          onClick={() => {
            const newCounta = Math.max(counta - 1, 1);
            setCounta(newCounta);
            if (isSession) setTimeLeft(newCounta * 60);
          }}
        >
          減らす
        </button>
      </div>

      {/* ビープ音のためのオーディオ要素 */}
      <audio id="beep" ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"></audio>
    </div>
  );
}

// コンポーネントをDOMにレンダリング
ReactDOM.render(<App />, document.getElementById("root"));