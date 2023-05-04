import openAi from './aiProvider.js';
import { config } from 'dotenv';
config();

export async function findBugs(userInput) {
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
          content: `Please look for bugs and try to fix them. Add comments about the changes you make at the end of the code in a code box: ${userInput}`,
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
