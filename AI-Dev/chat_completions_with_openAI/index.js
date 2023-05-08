import {API_KEY, API_URL} from "./keys.js";

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
      }),
    });
    const data = await responsee.json();
    console.log("Data: ",data.choices[0].message.content);
    resultText.innerText = data.choices[0].message.content;
  } catch (error) {
    console.error("Error: ", error);
  }
};

generateBtn.addEventListener("click", generate);
promptInput.addEventListener("keyup", (e) => {
  e.key === "Enter" && generate();
});
