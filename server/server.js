import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

/* Loading the environment variables from the .env file. */
dotenv.config();

/* Creating a new configuration object with the apiKey property set to the value of the OPENAI_API_KEY
environment variable. */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

/* Creating a new instance of the OpenAIApi class. */
const openai = new OpenAIApi(configuration);

const app = express();
/* Allowing the server to accept requests from other domains. */
app.use(cors());
/* Parsing the body of the request into a JSON object. */
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Helloooooooo",
  });
});

app.post("/", async (req, res) => {
  try {
    /* Getting the value of the prompt property from the body of the request. */
    const prompt = req.body.prompt;

    /* Using the OpenAI API to generate a response to the user's input. */
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    /* Sending the response from the OpenAI API to the client. */
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
});

app.listen(5000, () => console.log("listening on port http://localhost:5000"));
