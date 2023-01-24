const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: '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',
})

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const openai = new OpenAIApi(configuration)

const say = async (prompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.3,
    max_tokens: 400,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
  console.log(response.data.choices[0].text);
  read()
}

const read = async () => {
  readline.question('Prompt: ', prompt => {
    //readline.close()
    say(prompt)
  })
}

read()