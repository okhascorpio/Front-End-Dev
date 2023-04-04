import React from "react";
import "./styles.css";

const audiosLink =
  "https://raw.githubusercontent.com/okhascorpio/Front-End-Dev/main/react_dev/src/fcc_react_projects/drum_machine/audios.json";

function DrumApp() {
  const [audios, setAudios] = React.useState([]);

  const getAudios = async () => {
    try {
      const response = await fetch(audiosLink);
      const data = await response.json();
      setAudios(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAudios();
  }, []);

  const [volume, setVolume] = React.useState(1);
  const [clipName, setClipName] = React.useState("");

  return (
    <div className="container-fluid vh-100 vw-100 text-align">
      <h1 className="text-center text-white mt-1 mb-3">Drum Machine</h1>
      <div className="drum-box row m-auto">
        <div className="col-6 align-self-start">
          <div id="btn-grid" className="my-3 mx-1">
            {audios.map((audio) => (
              <Tab
                key={audio.id}
                audio={audio}
                volume={volume}
                setClipName={setClipName}
              />
            ))}
          </div>
        </div>
        <div className="col-6 m-auto h-50 d-flex flex-column align-items-center justify-content-center">
          <h4 className="text-white">Volume</h4>
          <input
            type="range"
            step="0.05"
            onChange={(e) => setVolume(e.target.value)}
            value={volume}
            max="1"
            min="0"
            className="w-70"
          />
          <br />
          <div className="text-center">
            <h4 className=" text-white">Sound Played</h4>
            <br />
            <div
              id="clip-name"
              className="border border-secondary text-secondary w-70"
            >
              {clipName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab({ audio, volume, setClipName }) {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  function handleKeyPress(e) {
    if (e.keyCode === audio.keyCode) {
      handlePlay();
    }
  }

  function handlePlay() {
    const audioClip = document.getElementById(audio.id);
    setActive(true);
    setTimeout(() => setActive(false), 150);
    audioClip.volume = volume;
    audioClip.currentTime = 0;
    audioClip.play();
    setClipName(audio.id);
    console.log("handlePlay", audio.id);
  }
  return (
    <button
      type="button"
      id="button"
      className={`btn btn-primary text-center ${active && "btn-warning"}`}
      onClick={handlePlay}
    >
      <audio id={audio.id} src={audio.url} />
      {audio.keyTrigger}
    </button>
  );
}

/*
const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<DrumApp />);
*/
export default DrumApp;