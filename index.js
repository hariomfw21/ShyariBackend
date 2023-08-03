const express = require("express");
const openAiFeedback = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");
const cors = require("cors");
const app = express();

config();

app.use(cors());
app.use(express.json());



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/generateSairy", async (req, res) => {
    const { topic } = req.body;
   try {
    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a Shyari about ${topic} in max 4 to 5 lines `,
          },
        ],
      });
      res.send(chat_completion.data.choices[0].message);

   } catch (error) {
     res.status(500).send({ error: 'Something went wrong.' });
   }
});


const PORT = 3000; // Set your preferred port number
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
