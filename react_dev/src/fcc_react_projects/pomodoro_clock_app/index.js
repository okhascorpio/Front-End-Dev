function ClockApp() {
  const sessionObject = {
    id: "session",
    title: "Session",
    length: 5,
  };
  const breakObject = {
    id: "break",
    title: "Break",
    length: 5,
  };
  const stateObject = {
    clockActive: false, // if timer not active the it is apused
    sessionActive: true, //if session is not active the break is active
  };
  const [sessionTimer, setSessionTimer] = React.useState(sessionObject);
  const [breakTimer, setBreakTimer] = React.useState(breakObject);
  const [timerState, setTimerState] = React.useState(stateObject);

  return (
    <div className="container text-center mt-5">
      <h1>25 + 5 Clock</h1>

      <div className="set-intervals d-flex justify-content-between w-50 mx-auto mt-5">
        <SetTime
          timer={breakTimer}
          setTimer={setBreakTimer}
          timerState={timerState}
          setTimerState={setTimerState}
        />
        <SetTime
          timer={sessionTimer}
          setTimer={setSessionTimer}
          timerState={timerState}
          setTimerState={setTimerState}
        />
      </div>
      <div className="timer-window border w-25 d-flex flex-column mx-auto mt-5">
        <div className="timer-display">
          <DisplayTime
            sessionTimer={sessionTimer}
            breakTimer={breakTimer}
            timerState={timerState}
            setTimerState={setTimerState}
          />
        </div>
      </div>
    </div>
  );
}

function DisplayTime({ sessionTimer, breakTimer, timerState, setTimerState }) {
  const { sessionActive, clockActive } = timerState;

  let title, length;
  if (sessionActive) {
    title = sessionTimer.title;
    length = sessionTimer.length;
  } else {
    title = breakTimer.title;
    length = breakTimer.length;
  }

  const [currentTime, setCurrentTime] = React.useState(length);
  const temp = length;
  //console.log("title and length ", title, length);
  
  const setClockState = (bool) => {
    setTimerState((prevState) => ({ ...prevState, clockActive: bool }));
  };

  const setSessionState = (bool) => {
    setTimerState((prevState) => ({ ...prevState, sessionActive: bool }));
  };

  React.useEffect(() => {
    let timerId;

    // run if clock was not active and current time is not zero
    if (clockActive && currentTime > 0) {
      // set the state of clock as active
      /*setTimerState((prevState) => ({
        ...prevState,
        clockActive: true,
      }));*/

      timerId = setInterval(() => {
        setCurrentTime((prevTime) =>  prevTime - 1);
        
      }, 1000);
      //console.log(title, length);
    } else if (clockActive && currentTime === 0) {
      const toggle = !sessionActive;
      setSessionState(toggle);
      setCurrentTime((prevTime) =>  length)
      console.log("2nd if",sessionActive ,"temp ", temp)
    } else if (!clockActive && temp !== length && currentTime > 0) {
      setCurrentTime((prevTime) =>  length)
      console.log("3rd if ",sessionActive ,"temp ", temp)
    }
    
    // if clock is running and session is active display session data
    //clockActive && sessionActive ? setCurrentTime(length) : null;
    //currentTime === 0 ? setPaused(true) : null;

    return () => {
      clearInterval(timerId);
    };
  }, [clockActive, length, currentTime]);

  return (
    <div>
      <h1>{title}</h1>
      <h1 id="session-time">{currentTime}</h1>
      <div className="play-pause-buttons">
          <button
            onClick={() => {
                setClockState(true);
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
                setClockState(false)
            }}
          >
            Pause
          </button>
        </div>
    </div>
  );
}

function SetTime({ timer, setTimer, timerState, setTimerState }) {
  const { title, length } = timer;
  const { clockActive } = timerState;

  const setSessionState = (bool) => {
    setTimerState((prevState) => ({ ...prevState, sessionActive: bool }));
  };

  const Increment = () => {
    if (!clockActive) {
      //setSessionState(false);
      setTimer((prevTimer) => ({ ...prevTimer, length: length + 1 }));
    }
  };
  const Decrement = () => {
    if (!clockActive) {
      //setSessionState(false);
      length > 1 &&
        setTimer((prevTimer) => ({ ...prevTimer, length: length - 1 }));
    }
  };

  return (
    <div className="timer-controls">
      <h1 className="timer-title">{title}</h1>
      <button className="timer-decrement" onClick={Decrement}>
        <span className="timer-symbol">-</span>
      </button>
      <span className="controller-time">{length}</span>
      <button className="timer-increment" onClick={Increment}>
        <span className="timer-symbol">+</span>
      </button>
    </div>
  );
}
const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<ClockApp />);
