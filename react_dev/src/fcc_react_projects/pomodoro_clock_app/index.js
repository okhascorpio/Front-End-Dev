function ClockApp() {
  const [sessionTime, setSessionTime] = React.useState(5);
  const [breakTime, setBreakTime] = React.useState(3);
  const [clockActive, setClockActive] = React.useState(false);
  const [sessionActive, setSessionActive] = React.useState(true);
  const [displayTime, setDisplayTime] = React.useState(sessionTime);

  const timeSettings = [
    { title: "Break", time: breakTime, setTime: setBreakTime },
    { title: "Session", time: sessionTime, setTime: setSessionTime },
  ];
  //console.log(timeSettings[1].time, displayTime)
  function handlePlayPause(val) {
    // set clock to be active
    setClockActive(val === "play");
  }

  function handleReset() {
    setSessionTime(25);
    setBreakTime(5);
    setDisplayTime(25);
  }


  
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
            sessionActive={sessionActive}
            clockActive={clockActive}
          />
        </div>
        <div className="play-pause-button">
          <button onClick={() => handlePlayPause("play")}>Play</button>
          <button onClick={() => handlePlayPause("pause")}>Pause</button>
          <button onClick={() => handleReset()}>Reset</button>
          <h1>{clockActive ? "Active" : "Not"}</h1>
        </div>
      </div>
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function countDown(setDisplayTime) {
      let timerId;

      timerId = setInterval(() => {
        setDisplayTime((prevTime) =>  prevTime - 1)
        console.log('prevtime',prevTime)
      }, 1000);

    return () => {
      clearInterval(timerId);
    };
  
  return null;
}

function DisplayTime({ displayTime, setDisplayTime, sessionActive, clockActive }) {

  React.useEffect(() => {
    clockActive && countDown(setDisplayTime={setDisplayTime}) 
    //setCurrentTime(displayTime);
  }, [displayTime, clockActive, countDown]);

  return (
    <div className="display-time">
      <h1 className="clock-title">{sessionActive ? "Session" : "Break"}</h1>
      <h1 className="clock-time">{displayTime}</h1>
    </div>
  );
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
  //const { title, time, setTime, clockActive } = props;

  const ChangeTime = (val) => {
    !clockActive &&
      time > 1 &&
      (setTime((prevTime) => prevTime + val),
      setDisplayTime((sessionActive && title === "Session") ? (time + val) : (!sessionActive && title === "Break") ? (time + val) : displayTime),
      console.log('title ',title, 'session active? ',sessionActive)
      );
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
const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<ClockApp />);
