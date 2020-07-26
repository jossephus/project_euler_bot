const TelegramBot = require("node-telegram-bot-api");
const token = "1395184510:AAFDob-OTjeb1d2zhxEnJvCVCMCPSXKyS68";
const bot = new TelegramBot(token , {polling : true});
const Question = require("./question");

bot.on('message' , (msg) => { 
	 const chatId = msg.chat.id;
	 const url = "https://projecteuler.net/problem=" + msg.text.toString();
 	 let questionNumber = 	 msg.text.toString();
 	 if(/^\d+$/.test(questionNumber)) {
 	 	let question = new Question(questionNumber)

 	 	question.getQuestion()
 	 		.then(q => {
 	 			console.log("Request for question number " , questionNumber , " received " );
 	 			bot.sendMessage(chatId , "```" + q + "```")
 	 			console.log("Question for " , questionNumber , " send ");

 	 		})
 	}
 	else {
 		bot.sendMessage(chatId , "Please send numbers only ");
 	}
})