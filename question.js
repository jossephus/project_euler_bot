const https = require("https");
const cheerio = require("cheerio");

class Question {
	constructor(questionNumber) {
		this.questionNumber = questionNumber;
	}
	doAllWork() {
		return new Promise((res , rej) => {
			this.getData(this.questionNumber)
				.then((data) => {
					return this.retrieveQuestion(data);
				})
				.then(text => {
					this.question = text
					res(this.question)
				})	
		})
	}
	getData(number){
		console.log("https://projecteuler.net/problem=" + number)
		return new Promise(resolve => https.get("https://projecteuler.net/problem=" + number , res => {
					let data = "";
					res.on("error" , err => {
		            	resolve(err.reason);
					})
					res.on("data" , d => {
						data += d;
					})
					res.on("end" ,() => {
						resolve(data);
					})

					})).catch(err => console.log(err));
			
	}
	retrieveQuestion(data) {
		return new Promise((resolve , reject) => {
			let $ = cheerio.load(data);
			let div = $('.problem_content');
			resolve(div.text())

		}).catch(err => console.log("Error " , err.message))
	}
	getQuestion() {
		return new Promise(res => {
			this.doAllWork()
				.then((question) => {
					res(question);
				})
		})
		
	} 
}

module.exports = Question ;
