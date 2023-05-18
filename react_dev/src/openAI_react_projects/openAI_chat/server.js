const PORT = 8000
const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY
const API_URL = process.env.API_URL


app.post('/completions', async (req, res) => {
    console.log("prompt ",req.body.message)
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: req.body.message }],
          max_tokens: 100,
        })}
    try {
        const response = await fetch(API_URL, options)
        const data = await response.json()
        res.send(data); 
    } catch (error) {
        console.error(error)
    }

})

app.listen(PORT, () => console.log("Your server is running on port",PORT))