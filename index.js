const TelegramBot = require('node-telegram-bot-api')
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

// Задаем переменные для бота
const token = '5791516074:AAGQAWdRihFsLLF-IBJWdawFpFSApJ8hzXc'

// Создаем бота
const bot = new TelegramBot(token, {polling: true})

const commands = {
	start: '/start',
	help: '/help',
	image: '/image '
}

// Обрабатываем сообщения пользователя
bot.on('message', (msg) => {
	const chatId = msg.chat.id
	const messageText = msg.text

	if (messageText === commands.start) {
		bot.sendMessage(chatId, 'Привет! Я бот для телеграма работающий с OpenAI. Напиши мне сообщение, я с радостью отвечу на него\n/help - помощь по командам')
	} else if (messageText === commands.help) {
		bot.sendMessage(chatId, '/start - приветственное сообщение\n/help - помощь по командам\nНапишите любое сообщение для обращения к ИИ\n/image [описание] - сгенерировать картинку по описанию')
	} else if (messageText.startsWith(commands.image)) {
		const imageText = messageText.substring(commands.image.length)
		if (!imageText.length) {
			bot.sendMessage(chatId, 'Укажите описание для генерации картинки')
			return;
		}

		console.log('Request image: \n'+imageText);
		openai.createImage({
			prompt: imageText,
			n: 1,
			size: "1024x1024",
		}).then(response => {
			console.log('Response image: \n'+response.data.data[0].url)
			bot.sendMessage(chatId, response.data.data[0].url)
		});
	} else {
		console.log('Request: \n'+messageText);
		openai.createCompletion({
			model: "text-davinci-003",
			prompt: messageText,
			temperature: 0.3,
			max_tokens: 1000,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		}).then(response => {
			console.log('Response: \n'+response.data.choices[0].text)
			bot.sendMessage(chatId, response.data.choices[0].text)
		});
	}
});