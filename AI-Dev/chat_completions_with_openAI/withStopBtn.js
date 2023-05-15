import { API_KEY, API_URL } from "./keys.js";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

let controller = null;

const generate = async () => {
    if (!promptInput.value) {
        alert("Please enter a prompt.");
        return;
    }
    generateBtn.disabled = true;
    resultText.innerText = "Generating...";
    stopBtn.disabled = false;

    controller = new AbortController();
    const signal = controller.signal;

  try {
    const responsee = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptInput.value }],
        stream: true,
      }),
      signal,
    });

    const reader = responsee.body.getReader();
    const decoder = new TextDecoder("utf-8");

    resultText.innerText =""; // reset the string

    while (true) {
      const chunk = await reader.read();
      const { done, value } = chunk;
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value);
      const lines = decodedChunk.split("\n");
      const parsedLines = lines
                          .map(line => line.replace(/^data: /, "").trim())
                          .filter(line => line !=="" && line !=="[DONE]")
                          .map((line) => JSON.parse(line));

      for(const parsedLine of parsedLines) {
        const {choices} = parsedLine;
        const {delta} = choices[0];
        const {content} = delta; 
        if(content)
        {
            resultText.innerText += content; // add chunks to the innerText
        }
    }
      

      
    }
  } catch (error) {
    if (signal.aborted) {
      resultText.innerText = "Request aborted.";
    } else {
      resultText.innerText = "Error occured while generating.";
    console.error("Error: ", error);
    }
    
  }finally
  {
    generateBtn.disabled = false;
    stopBtn.disabled = true;
    controller = null;
  }
};
const stop = () => {
  if (controller) {
    controller.abort();
    controller = null;
  }

}
generateBtn.addEventListener("click", generate);
promptInput.addEventListener("keyup", (e) => {
  e.key === "Enter" && generate();
});

stopBtn.addEventListener("click",stop)
