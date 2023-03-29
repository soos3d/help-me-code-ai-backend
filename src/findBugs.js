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
          content: `Please look for possible errors and bugs in the following code. Fix the code and add comments about the fixes at the end: ${userInput}`,
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
