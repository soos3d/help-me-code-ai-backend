import openAi from './aiProvider.js';
import { config } from 'dotenv';
config();

export async function addComments(userInput) {
  try {
    const res = await openAi.createChatCompletion({
      model: process.env.AI_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a senior developer. A user will ask for your assistance. Identify the coding language and tools used.',
        },
        {
          role: 'user',
          content: `Please add useful comments to the following code and return the commented code in a code box: ${userInput}`,
        },
      ],
    });

    const chatResponse = res.data.choices[0].message.content
    console.log(res.data.choices[0].message.content);
    //console.log(res.data.choices);

    return chatResponse
  } catch (error) {
    console.error('Error fetching rewritten code:', error.message);
  }
}