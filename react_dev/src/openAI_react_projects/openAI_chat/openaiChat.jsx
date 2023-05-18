import React, { useState, useEffect } from "react";
import "./styles.css";


const MyChatApp = () => {
  const [message, setMessage] = useState("")
  const [prompt, setPrompt] = useState("")

  const getMessage = async () => {
    if (prompt !== "") {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        })
      }
      try {
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        setMessage(data.choices[0].message.content)
      } catch (error) {
        console.error(error)
      }
      setPrompt("")
    }
  }

  useEffect(() => {
    console.log(message);
  }, [message]
  )


  return (
    <div id="window">
      <section id="sideBar">
        <button id="newChatBtn">✚ New Chat</button>
        <ul id="chatHistory"><li>Hello1</li></ul>
        <nav id="navElement"><p>Coded by Faheem Ahmed</p></nav>
      </section>
      <section id="mainSection">Hello
        <div id="chatContainer"></div>
        <div id="inputContainer">
          <input id="prompt" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <button id="submit" onClick={getMessage}>Submit</button>
        </div>
      </section>
    </div>
  )

}

export default MyChatApp;