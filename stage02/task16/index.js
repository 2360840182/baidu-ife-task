
/*
Uncaught TypeError: document.getElmentById is not a function
at HTMLButtonElement.addData (index.html:30)
一行代码找了半个小时发现不了错误，迷
*/
var data = {};

function render() {	
	var content = "";
	var city = document.getElementById("aqi-city-input").value.trim();
	var index = document.getElementById("aqi-value-input").value.trim();
	//当data是字符串对象时，i是键名
	for (var city in data) {
		content += "<tr><td>" + city + "</td><td>" + data[city] +"</td><td><button>删除</button></td></tr>";
	}
	var table = document.querySelector("table");
	table.innerHTML = content;
}
	
function validate() {
	//这里为空时，city为“”
	var city = document.getElementById("aqi-city-input").value.trim();
	var index = document.getElementById("aqi-value-input").value.trim();
	if (city == "" || index == "") {
		alert("输入为空");
		return false;
	}
	//输入城市名必须为中英文字符
	var re1 = /[^\u4E00-\u9FA5a-zA-z\s]/g;
	
	if (re1.test(city)) {
		alert("输入必须为中英文");
		return false;
	}
	//空气质量指数必须为整数
	var re2 = /[^0-9.\s]/g;
	if (re2.test(index)) {
		alert("空气质量指数必须为整数");
		return false;
	}
	return true;
}

function delBtnHandle(city) {
	delete data[city];
	render();
}

function addBtnHandle() {
		if(validate()) {
			var city = document.getElementById('aqi-city-input').value.trim();
			var airIndex = document.getElementById('aqi-value-input').value.trim();
			data[city] = airIndex;
			render();
		}
	}

function init() {
	document.getElementById("add-btn").addEventListener("click", addBtnHandle);
	document.getElementById("aqi-table").addEventListener("click", function(e){
		if (e.target && e.target.nodeName == "BUTTON") {
										
				var city = e.target.parentNode.parentNode.childNodes[0].innerHTML;
				delBtnHandle(city);
		}
	})
}

init();
