var url = "concret.json";
var bookUrl = "concret.json";
var bookData = [];
//我的追书
var myBook = new Vue({					
	el: "#myBook",
	delimiters: ['[[', ']]'],
	data: { 
		myBooks: [],
		bookId: 0
	},
	methods: {
		showAll: function(){
			$.post(bookUrl, 
				{"userId": 1},
				function(data){
				myBookChange(data);
				bookData = data;
			})

		},
		hideAll: function(){
			bookCommand.commands = bookData.bookComment
		}
	}
})	
//我的钱包
var myMoney = new Vue({					
	el: "#myMoney",
	delimiters: ['[[', ']]'],
	data: {
		balance: 0,
		votes: 0,
		recommended: 0
	}
})	
//书评
var bookCommand = new Vue({
	el: "#bookCommand",
	delimiters: ['[[', ']]'],
	data: {
		commands: []
	},
	methods: {
		showCommand: function(){

		}
	}
})
//我的追书
function myBookChange(data){
/*	userId = data.bookId;*/
	myBook.myBooks = data.userRunBook;
	myBook.bookId = data.bookId;
	console.log(1);
}
//改变我的钱包
function myMoneyChange(data){
	myMoney.balance = data.balance;
	myMoney.votes = data.votes;
	myMoney.recommended = data.recommended;
}
//改变书论函数
function bookCommandChange(data){
	bookCommand.commands = data.bookComment;
}
//页面加载时的请求
$.post(url,
	{"userId": 1},
	function(data){
		myBookChange(data);
		myMoneyChange(data);
		bookCommandChange(data);
	})