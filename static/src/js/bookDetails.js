var Win = $(window);	
 	var bgPeng = $('#bgPeng');
	var pengChang = $('#pengChang');
	var closePen = $('.closePen');
	var root = $('#root');
	var penSubmit = $('#penSubmit');
	var contentSubmit = $('#contentSubmit');
	var fixCommand = $('#fixCommand');
	var raChoose = $('.raChoose');

	var bookId = 0; 		//初始化书籍id
	var val = 0;		//初始化被选中的值
	var penCount = 0;    //初始化输入的数量
	var comTitle = '' 			//初始化评论标题
	var comText = ''			//初始化评论内容	
	var penUrl = "bookDetails.json";		//捧场提交的url
	var comUrl = "bookDetails.json";		//评论提交的url
	var url = "bookDetails.json";	//页面加载时的url
	
	//获取bookId
	function getBookId(){
	    var url=window.location.href;
	    var s=url.split('/');
	    var bookId;
	    for (x in s){
	        var bookIdTest = new RegExp("^[0-9]+$").test(s[x]);
	        if (bookIdTest==true){
	            bookId=parseInt(s[x]);
	            return bookId;
	        }else{
	        	return false;
	        }
	    }
	}
	bookId = getBookId();

	//改变信息展示函数
	function showModuleChange(data){
		showModule.title = data.bookInfo[0].bookName,		
		showModule.author = data.bookInfo[0].author,
		showModule.fontNumber = data.bookInfo[0].wordNumber,
		showModule.clickNumber = data.bookInfo[0].clicksNumber,
		showModule.bookFans = data.bookInfo[0].subscribersNumber,
		showModule.status = data.bookInfo[0].state,
		showModule.imgSrc = data.bookInfo[0].coverImg,
		showModule.grounds = data.bookInfo[0].bookName
	}

	//改变最新更新函数
	function bookRecentlyChange(data){
		bookRecently.timeData = data.bookInfo[0].updateTime,
		bookRecently.charpterNumber = data.bookInfo[0].chaptersId,
		bookRecently.charpterTitle = data.bookInfo[0].chaptersName,
		bookRecently.chaptersType = data.bookInfo[0].chaptersType
	}

	//改变捧场函数
	function boostChange(data){
		boost.lkNumber = data.bookInfo[0].reward,
		boost.nm1 = data.bookInfo[0].catBallNumber,
		boost.nm2 = data.bookInfo[0].catnipNumber,
		boost.nm3 = data.bookInfo[0].catStickNumber,
		boost.nm4 = data.bookInfo[0].catFoodNumber,
		boost.nm5 = data.bookInfo[0].catFishNumber,
		boost.nm6 = data.bookInfo[0].catHouseNumber,
		boost.btpersons = data.bookReward
	}

	//改变评论函数
	function bookCommandChange(data){
		bookCommand.commands = data.bookComment;
	}

	//信息展示
	var showModule = new Vue({
			el: "#showModule",			
			delimiters: ['[[', ']]'],   
			data: {						
				title: '',		
				author: '',
				fontNumber: 0,
				clickNumber: 0,
				bookFans: 0,
				status: '',
				imgSrc: '',
				grounds: ''
			}
		})


	//最新更新
	var bookRecently = new Vue({
			el: "#bookRecently",
			delimiters: ['[[', ']]'],
			data: {
				timeData: '',
				charpterNumber: 0,
				charpterTitle: '',
				chaptersType: 0
			}
		})

	//捧场
	var boost = new Vue({	
			el: "#boost",
			delimiters: ['[[', ']]'],
			data: {
				lkNumber: 0,
				nm1: 0,
				nm2: 0,
				nm3: 0,
				nm4: 0,
				nm5: 0,
				nm6: 0,
				btpersons: []
			},
			//点击捧场时
			methods: {
				showPeng: function(){
					//捧场
					//判断登陆状态，已登陆展示，未登录，跳转登陆界面
					pengChang.show();						
				}
			}
		})

	//评论
	var bookCommand = new Vue({
			el: "#bookCommand",
			delimiters: ['[[', ']]'],
			data: {
				commands: []
			},
			methods: {
				showCommand: function(){
					//书评
					//判断登陆状态，已登陆展示，未登录，跳转登陆界面
					fixCommand.show();
				}
			}
		})

	//页面加载请求
	$.get(url, {"Id": bookId}, function(data){
		showModuleChange(data);
		bookRecentlyChange(data);
		boostChange(data);
		bookCommandChange(data);	
	})
	//捧场和评论关闭
	closePen.click(function(){
		pengChang.hide();
		fixCommand.hide();
	})

	//监听窗口滚动事件
	Win.scroll(function(){
		
	});

	//捧场提交
	penSubmit.click(function(){
		for(var i = 0; i < raChoose.length; i++){
			if(raChoose[i].checked)
				val = raChoose[i].value;
		}
		penCount = $('#penText').val();
		if(penCount > 0 && val)
		{
			$.get(penUrl,
			{

				"rewardType": val,
				"inputCount": penCount,
				"Id": bookId
			},
			function(data){
				if(data){
					boostChange(data);
					alert("捧场成功");
					pengChang.hide();
				}		
				else{
					alert("余额不足，请充值");
					pengChang.hide();
				}
			})
		}
	})

	//评论提交
	contentSubmit.click(function(){
		comTitle = $('#addTitle').val();
		comText = $('#addText').val();
		if(comTitle && comText){
			$.post(comUrl,
			{
				"commandTitle": comTitle,
				"commandText": comText,
				"bookId": bookId
			},
			function(data){
				if(data){
					bookCommandChange(data);
					alert("提交成功");
					$('#addTitle').val('');
					$('#addText').val('');
					$(".inputSize").html(50);
					fixCommand.hide();
				}else{
					alert("阿偶，出错啦，请重新提交")
					fixCommand.hide();
				}
			})
		} 
	})

	//输入字数计算
		function countInput(obj) {
			var len = $(obj).val().length;
			if(len < 50) {
				$(".inputSize").html(50 - parseInt(len));
			} else {
				$(".inputSize").html(0);
			}
		}
