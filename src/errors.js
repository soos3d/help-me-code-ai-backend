import openAi from './aiProvider.js';
import { config } from 'dotenv';
config();

export async function fetchRewrittenCode(userInput) {
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
          content: `Please include error handling in the following code without changing the logic, and return the new code in a code box: ${userInput}`,
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
