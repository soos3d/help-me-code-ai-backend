import openAi from './aiProvider.js';

export async function findBugs(userInput) {
  try {
    const res = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a senior developer. A user will ask for your assistance. Identify the coding language and tools used.',
        },
        {
          role: 'user',
          content: `Please look for bugs and try to fix them. Add comments about the changes you make at the end of the code: ${userInput}`,
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
