/*
import React from "react";
import { useEffect, useState } from "react";



import "./styles.css";

import {
  Provider,
  connect,
  createStore,
  useSelector,
  useuseDispatch,
} from "redux";
*/

const Provider = ReactRedux.Provider;
const dispatch = ReactRedux.useDispatch;
const useSelector = ReactRedux.useSelector;
const audiosLink =
  "https://raw.githubusercontent.com/okhascorpio/Front-End-Dev/main/react_dev/src/fcc_react_projects/drum_machine/audios.json";

const SET_AUDIOS = "SET_AUDIOS";
const SET_VOLUME = "SET_VOLUME";
const SET_CLIP_NAME = "SET_CLIP_NAME";

const addAudios = (message) => {
  return {
    type: SET_AUDIOS,
    audios: message,
  };
};
const addVolume = (message) => {
  return {
    type: VOLUME,
    volume: message,
  };
};
const addClipName = (message) => {
  return {
    type: SET_CLIP_NAME,
    clipName: message,
  };
};

const initialState = {
  audios: [],
  volume: 1,
  clipName: "",
};

// Define a reducer function to handle actions and update the store state
function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_AUDIOS":
      return { ...state, audios: action.audios };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "SET_CLIP_NAME":
      return { ...state, clipName: action.clipName };
    default:
      return state;
  }
}

// Create the Redux store
const store = Redux.createStore(stateReducer);

class DrumApp extends React.Component {
  //const [audios, setAudios] = React.useState([]);
  //const useDispatch = useuseDispatch();
  constructor(props) {
    super(props);

    this.addAudios = this.addAudios.bind(this);
    this.addVolume = this.addVolume.bind(this);
    this.addClipName = this.addClipName.bind(this);
  }

  submitAudios() {
    this.props.submitNewAudio(this.state.input);
  }
  submitVolume() {
    this.props.submitNewVolume(this.state.input);
  }
  submitClipName() {
    this.props.submitNewClipName(this.state.input);
  }
  /*
  const audios = useSelector(state => state.audios);
  const volume = useSelector(state => state.volume);
  const clipName = useSelector(state => state.clipName);*/


  componentDidMount() {
    fetch(data)
      .then((res) => res.json())
      .then((res) => {
        this.props.submitAudios(res);
      });
  }


  render() {
    return (
      <div className="container-fluid vh-100 vw-100 text-align">
        <h1 className="text-center text-white mt-1 mb-3">Drum Machine</h1>
        <div className="drum-box row m-auto">
          <div className="col-6 align-self-start">
            <div id="btn-grid" className="my-3 mx-1">
              {/*audios.map((audio) => (
                <Tab
                  key={audio.id}
                  audio={audio}
                  volume={volume}
                  clipName={clipName}
                />
              ))*/}
            </div>
          </div>
          <div className="col-6 m-auto h-50 d-flex flex-column align-items-center justify-content-center">
            <h4 className="text-white">Volume</h4>
            <input
              type="range"
              step="0.05"
              onChange={this.submitVolume}
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
}
/*
function Tab({ audio, volume }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.keyCode === audio.keyCode) {
        handlePlay();
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  function handlePlay() {
    const audioClip = document.getElementById(audio.id);
    setActive(true);
    setTimeout(() => setActive(false), 150);
    audioClip.volume = volume;
    audioClip.currentTime = 0;
    audioClip.play();
    //dispatch({ type: "SET_CLIP_NAME", payload: audio.id });
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
*/
const mapStateToProps = (state) => {
  return { messages: state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitNewAudio: (message) => {dispatch(addAudios(message))},
    submitNewVolume: (message) => {dispatch(addVolume(message))},
    submitNewClipName: (message) => {dispatch(addClipName(message))}

  }
};
// render to root
class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DrumApp />
      </Provider>
    );
  }
}

const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<AppWrapper />);
