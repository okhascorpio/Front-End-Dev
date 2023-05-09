import { API_KEY, API_URL } from "./keys.js";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

const generate = async () => {
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
    });
    //const data = await responsee.json();
    //console.log("Data: ",data.choices[0].message.content);
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
            //console.log(content);
            resultText.innerText += content; // add chunks to the innerText
        }
    }
      

      
    }
    //resultText.innerText = data.choices[0].message.content;
  } catch (error) {
    console.error("Error: ", error);
  }
};

generateBtn.addEventListener("click", generate);
promptInput.addEventListener("keyup", (e) => {
  e.key === "Enter" && generate();
});
