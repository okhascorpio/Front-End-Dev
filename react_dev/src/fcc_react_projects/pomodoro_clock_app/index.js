//import beepFile from 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';
const audio = document.getElementById("timer-beep");

function ClockApp() {
  const [sessionTime, setSessionTime] = React.useState(5);
  const [breakTime, setBreakTime] = React.useState(3);
  const [clockActive, setClockActive] = React.useState(false);
  const [sessionActive, setSessionActive] = React.useState(true);
  const [displayTime, setDisplayTime] = React.useState(sessionTime * 60);

  const timeSettings = [
    { title: "Break", time: breakTime, setTime: setBreakTime },
    { title: "Session", time: sessionTime, setTime: setSessionTime },
  ];
  function handlePlayPause(val) {
    setClockActive(val === "play");
  }

  function handleReset() {
    setSessionTime(25);
    setBreakTime(5);
    setDisplayTime(25 * 60);
  }

  React.useEffect(() => {
    sessionActive
      ? setDisplayTime(sessionTime * 60)
      : setDisplayTime(breakTime * 60);
  }, [sessionActive]);

  return (
    <div className="container text-center mt-5">
      <h1>25 + 5 Clock</h1>

      <div className="set-intervals d-flex justify-content-between w-50 mx-auto mt-5">
        {timeSettings.map((setting) => (
          <SetTime
            key={setting.title}
            title={setting.title}
            time={setting.time}
            setTime={setting.setTime}
            clockActive={clockActive}
            sessionActive={sessionActive}
            displayTime={displayTime}
            setDisplayTime={setDisplayTime}
          />
        ))}
      </div>
      <div className="timer-window border w-25 d-flex flex-column mx-auto mt-5">
        <div className="timer-display">
          <DisplayTime
            displayTime={displayTime}
            setDisplayTime={setDisplayTime}
            sessionActive={sessionActive}
            setSessionActive={setSessionActive}
            clockActive={clockActive}
          />
        </div>
        <div className="play-pause-button">
          <button onClick={() => handlePlayPause("play")}>Play</button>
          <button onClick={() => handlePlayPause("pause")}>Pause</button>
          <button onClick={() => handleReset()}>Reset</button>
        </div>
      </div>
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

function DisplayTime({
  displayTime,
  setDisplayTime,
  sessionActive,
  setSessionActive,
  clockActive,
}) {
  React.useEffect(() => {
    let timerId;

    if (clockActive && displayTime >= 0) {
      timerId = setInterval(() => {
        setDisplayTime((prevTime) => prevTime - 1);
        displayTime === 0 && setSessionActive(!sessionActive) && audio.play();
      }, 1000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [displayTime, clockActive, setDisplayTime]);

  return (
    <div className="display-time">
      <h1 className="clock-title">{sessionActive ? "Session" : "Break"}</h1>
      <h1 className="clock-time">{formatTime(displayTime)}</h1>
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

function formatTime(val) {
  let str = "";
  let seconds = val % 60;
  let minutes = parseInt(val / 60) % 60;
  const addLeadingZeroes = (time) => {
    return time < 10 ? "0" + time : time;
  };
  str += addLeadingZeroes(minutes) + ":" + addLeadingZeroes(seconds);
  return str;
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

function SetTime({
  title,
  time,
  setTime,
  clockActive,
  sessionActive,
  displayTime,
  setDisplayTime,
}) {
  const ChangeTime = (val) => {
    !clockActive &&
      time > 1 &&
      (setTime((prevTime) => prevTime + val),
      setDisplayTime(
        sessionActive && title === "Session"
          ? (time + val) * 60
          : !sessionActive && title === "Break"
          ? (time + val) * 60
          : displayTime
      ));
  };

  return (
    <div className="timer-controls">
      <h1 className="timer-title">{title}</h1>
      <button className="timer-decrement" onClick={() => ChangeTime(-1)}>
        <span className="timer-symbol">-</span>
      </button>
      <span className="controller-time">{time}</span>
      <button className="timer-increment" onClick={() => ChangeTime(+1)}>
        <span className="timer-symbol">+</span>
      </button>
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<ClockApp />);
