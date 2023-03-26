import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
config();

const openAiKey = process.env.OPEN_AI;

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: openAiKey,
  })
);

export default openAi;