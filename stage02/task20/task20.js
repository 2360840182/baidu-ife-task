var input = document.getElementById("input"), 
	leftIn = document.getElementById("left-in"),
	leftOut = document.getElementById("left-out"),
	rightIn = document.getElementById("right-in"),
	rightOut = document.getElementById("right-out"),
	queue = document.getElementById("queue"),
	query_button = document.getElementById("query-button");
	query_input = document.getElementById("query-input");
query_button.addEventListener("click", match);
leftIn.addEventListener("click",leftSideIn);
leftOut.addEventListener("click",leftSideOut);
rightIn.addEventListener("click",rightSideIn);
rightOut.addEventListener("click",rightSideOut);
queue.addEventListener("click",function(e){ 
	var node = e.target;
	//Array.prototype == []???
	var index = Array.prototype.indexOf.call(node.parentNode.children, node);
	remove(index);
});

var container = new Array();
var inputArray = [];

function highLight(index) {
	var cursor = queue.children[index];
	cursor.style.backgroundColor = "red";
}

function match() {
	for(var z in container) {
		queue.children[z].style.backgroundColor = "green";
	}
	
	for(var i = 0, j = queue.children.length; i < j; i++) {
		if (queue.children[i].innerHTML.search(query_input.value) != -1) {
			highLight(i);
		}
	}
}

function divideInput() {
	if(validate()) {
		var templeInput = input.value.replace(/[,，。.;；、/s]/g,'|');
		inputArray = templeInput.split('|');
		return true;
	}
	return false;
}


function remove(index) {
	container.splice(index,1);
	render();
}


function validate() {
	//非数字的正则表达式不能检测出空格
	if(input.value=="" || /[^0-9,，。.;；、/s]/g.test(input.value)){
		alert("请输入数字");
		return false;
	}
	return true;
}

function render() {
	var content = "",height = "";
	for(var i=0, j = container.length; i < j; i++) {
		content += '<div class="bar" style="background-color:#2288;' + 
		'margin:10px;width: 100px;height: 100px;">' +container[i] + '</div>';
	}
	queue.innerHTML = content;
}

function leftSideIn() {
	if(divideInput()) {
		//这里value是字符串
		for (var i = 0, j = inputArray.length; i < j; i++) {
			container.unshift(inputArray[i]);
		}
		render();
	}
	
}
function leftSideOut() {
	container.shift();
	render();
	
}

function rightSideIn() {
	if(divideInput()) {
		//这里value是字符串
		for (var i = 0, j = inputArray.length; i < j; i++) {
			container.push(inputArray[i]);
		}
		render();
	}
}

function rightSideOut() {
	container.pop();
	render();
	
}

