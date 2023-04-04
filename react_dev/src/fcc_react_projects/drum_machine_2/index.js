import React from "react";
import "./styles.css";


// URL of the JSON file containing audio data
const data =
  "https://raw.githubusercontent.com/okhascorpio/Front-End-Dev/main/react_dev/src/fcc_react_projects/drum_machine/audios.json";

// DrumApp component
class DrumApp extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state
    this.state = {
      audios: [],
      keyName: "",
      volume: 1,
      power: true,
    };
    // Bind methods to the component instance
    this.addKeyName = this.addKeyName.bind(this);
    this.addVolume = this.addVolume.bind(this);
    this.handlePower = this.handlePower.bind(this);
  }

  // Method to update the state with the key name of the button clicked
  addKeyName(val) {
    this.setState({ keyName: val });
  }

  // Method to update the state with the current volume value
  addVolume(e) {
    this.setState({ volume: e.target.value });
  }

  // Method to update the state with the current power value
  handlePower(e) {
    this.setState({ power: e.target.checked });
  }

  // Method to fetch audio data from the JSON file and update the state with it
  componentDidMount() {
    fetch(data)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ audios: res });
      });
  }

  // Render method to render the UI
  render() {
    const { audios, keyName, volume, power } = this.state;

    return (
      <div className="container-fluid" id="drum-machine">
        <h1 className="text-center text-white mt-2 mb-3">Drum Machine</h1>
        <div
          id="drum-box"
          className="d-flex align-items-center justify-content-around mx-auto"
        >
          <div id="btn-grid">
            {/* Map over the audio data and render each Tab component */}
            {audios.map((audio) => (
              <Tab
                key={audio.id}
                audio={audio}
                volume={volume}
                addKeyName={this.addKeyName}
                power={power}
              />
            ))}
          </div>
          <div
            id="control-box"
            className="d-flex flex-column justify-content-between text-center"
          >
            <div>
              <h4 className="text-primary">Power</h4>
              {/* Power switch */}
              <div id="power" className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={power}
                  id="switch"
                  onChange={this.handlePower}
                />
              </div>
            </div>

            <div>
              <h4 className="text-primary">Clip Name</h4>
              {/* Display the name of the last button clicked */}
              <h4 id="display">{keyName}</h4>
            </div>

            <div>
              <h4 className="text-primary">Volume</h4>
              {/* Volume slider */}
              <input
                type="range"
                step="0.05"
                onChange={this.addVolume}
                value={volume}
                max="1"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Tab component to render a button with an audio clip
function Tab(props) {
  const [active, setActive] = React.useState(false);

 React.useEffect(() => {
  function handleKeyPress(e) {
    if (e.keyCode === props.audio.keyCode) {
      handlePlay();
    }
  }
  
  document.addEventListener("keydown", handleKeyPress);
  return () => {
    document.removeEventListener("keydown", handleKeyPress);
  };
});
 
  
  
  // Method to play the audio clip when the button is clicked
  function handlePlay() {
    // Check if power is on before playing the audio clip.
    if (props.power) {
      // Get the audio clip element by its ID.
      const audioClip = document.getElementById(props.audio.keyTrigger);
  
      // Set the button active for a short period when clicked.
      setActive(true);
      setTimeout(() => setActive(false), 200);
  
      // Set the volume and start playing the audio clip.
      audioClip.volume = props.volume;
      audioClip.currentTime = 0;
      audioClip.play();
      props.addKeyName(props.audio.id);
    }
  }
  
  // Render the button element that plays the audio clip.
  return (
    <button
      type="button"
      id="button"
      className={`drum-pad btn btn-primary text-center ${active && "btn-warning"}`}
      onClick={handlePlay}>
      <audio className="clip" id={props.audio.keyTrigger} src={props.audio.url} />
      {props.audio.keyTrigger}
    </button>
  );
}



/*
const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<DrumApp />);
*/

export default DrumApp;
