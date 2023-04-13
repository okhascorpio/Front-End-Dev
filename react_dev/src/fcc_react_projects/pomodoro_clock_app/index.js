import React from 'react';
import './styles.css';
//import beepFile from 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';
const audioUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

function ClockApp() {
  const [sessionTime, setSessionTime] = React.useState(25);
  const [breakTime, setBreakTime] = React.useState(5);
  const [clockActive, setClockActive] = React.useState(false);
  const [sessionActive, setSessionActive] = React.useState(true);
  const [displayTime, setDisplayTime] = React.useState(sessionTime * 60);
  const audioBeep = React.useRef();

  const timeSettings = [
    { id: "break", title: "Break Length", time: breakTime, setTime: setBreakTime },
    { id: "session", title: "Session Length", time: sessionTime, setTime: setSessionTime }
  ];

  function handlePlayPause() {
    setClockActive(!clockActive);
  }

  function handleReset() {
    setClockActive(false);
    setSessionActive(true);
    setSessionTime(25);
    setBreakTime(5);
    setDisplayTime(25 * 60);
    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
  }

  React.useEffect(() => {
    sessionActive
      ? setDisplayTime(sessionTime * 60)
      : setDisplayTime(breakTime * 60);
  }, [sessionTime,breakTime,setDisplayTime,sessionActive]);

  return (
    <div className="text-center pt-5 px-4" >
      <h1 className="title">Pomodoro Timer</h1>

      <div className="set-intervals d-flex justify-content-between mx-auto mt-5">
        {timeSettings.map((setting) => (
          <SetTime
            key={setting.title}
            id={setting.id}
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
      <div className="timer-window d-flex flex-column mx-auto mt-5">
        <div className="timer-display">
          <DisplayTime
            displayTime={displayTime}
            setDisplayTime={setDisplayTime}
            sessionActive={sessionActive}
            setSessionActive={setSessionActive}
            clockActive={clockActive}
            audioBeep={audioBeep}
          />
        </div>
        <div className="play-pause-reset d-flex justify-content-center mt-4">
          <button id="start_stop" className= {`btn btn-success rounded-pill ${clockActive && "btn-warning"}`} onClick={() => handlePlayPause()}>
            {clockActive ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
          </button><span></span>
          <button id="reset" className="btn btn-danger rounded-pill" onClick={() => handleReset()}>
          <i className="fa fa-clock-rotate-left"></i>
          </button>
          <audio id="beep" src={audioUrl} type="audio" ref={audioBeep} />
        </div>
      </div>
      <p className="author text-center">Designed and Coded by<br/>Faheem Ahmed</p>
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
  audioBeep,
}) {
  React.useEffect(() => {
    let timerId;

    if (clockActive && displayTime >= 0) {
      timerId = setInterval(() => {
        setDisplayTime((prevTime) => prevTime - 1);
        if (displayTime === 0) {
          audioBeep.current.play();
          setSessionActive(!sessionActive);
        }
      }, 1000);
    }
    !clockActive && clearInterval(timerId);
    return () => {
      clearInterval(timerId);
    };
  }, [displayTime, clockActive, setDisplayTime, audioBeep, sessionActive, setSessionActive]);

  return (
    <div className="display-time">
      <h1 id="timer-label" className="clock-title">
        {sessionActive ? "Session" : "Break"}
      </h1>
      <h1 id="time-left" className="clock-time">
        {formatTime(displayTime)}
      </h1>
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

function formatTime(val) {
  let str = "";
  let seconds = val % 60;
  let tempMinutes = parseInt(val / 60) % 60;
  let minutes = val !== 0 && val % 3600 === 0 ? 60 : tempMinutes;
  const addLeadingZeroes = (time) => {
    return time < 10 ? "0" + time : time;
  };
  str += addLeadingZeroes(minutes) + ":" + addLeadingZeroes(seconds);
  return str;
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

function SetTime({
  id,
  title,
  time,
  setTime,
  clockActive,
  sessionActive,
  displayTime,
  setDisplayTime
}) {
  const ChangeTime = (val) => {
    !clockActive &&
      time >= 1 &&
      time <= 60 &&
      setTime((prevTime) => (prevTime === 60 && val === 1) || (prevTime < 2 && val === -1)? prevTime : prevTime + val)

      setDisplayTime(
        sessionActive &&
          title === "Session" &&
          ((time < 60 && val === 1) || (time > 1 && val === -1))
          ? (time + val) * 60
          : !sessionActive &&
            title === "Break" &&
            ((time < 60 && val === 1) || (time > 1 && val === -1))
          ? (time + val) * 60
          : displayTime
      );
  };

  return (
    <div className="timer-controls d-flex flex-column align-items-center justify-content-between">
      <h3 id={id + "-label"} className="timer-title">
        {title}
      </h3>
      <div className="button-block d-flex align-items-center">
      <button
        id={id + "-decrement"}
        className="timer-decrement btn btn-info rounded"
        onClick={() => ChangeTime(-1)}
      >
        <span className="timer-symbol"><i className="fa fa-arrow-down"></i></span>
      </button>
      <span id={id + "-length"} className="controller-time mx-3">
        {time}
      </span>
      <button
        id={id + "-increment"}
        className="timer-increment btn btn-info"
        onClick={() => ChangeTime(+1)}
      >
        <span className="timer-symbol"><i className="fa fa-arrow-up"></i></span>
      </button>
      </div>
      
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/*
const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<ClockApp />);
*/
export default ClockApp;