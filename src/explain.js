import openAi from './aiProvider.js';
import { config } from 'dotenv';
config();

export async function explain(userInput) {
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
          content: `Please explain what the following code does in a conversational way: ${userInput}`,
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
