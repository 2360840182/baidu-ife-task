var input = document.getElementById("input"), 
	leftIn = document.getElementById("left-in"),
	leftOut = document.getElementById("left-out"),
	rightIn = document.getElementById("right-in"),
	rightOut = document.getElementById("right-out");
	queue = document.getElementById("queue");
leftIn.addEventListener("click",leftSideIn);
leftOut.addEventListener("click",leftSideOut);
rightIn.addEventListener("click",rightSideIn);
rightOut.addEventListener("click",rightSideOut);
//伪删除
queue.addEventListener("click",function(e){ 
	var node = e.target;
	//Array.prototype == []???
	var index = Array.prototype.indexOf.call(node.parentNode.children, node);
	remove(index);
});

var container = new Array();

function remove(index) {
	container.splice(index,1);
	render();
}

function validate() {
	//非数字的正则表达式不能检测出空格
	if(input.value=="" || /[^0-9]/g.test(input.value)){
		alert("请输入数字");
		return false;
	}
	return true;
}

function render() {
	var content = "";
	for(var i=0, j = container.length; i < j; i++) {
		content += '<div style="background-color:red;' + 
		'margin: 10px; width: 100px;height: 100px;">' + container[i] + '</div>';
	}
	queue.innerHTML = content;
}

function leftSideIn() {
	if(validate()) {
		//这里value是字符串
		container.unshift(input.value);
		render();
	}
	
}
function leftSideOut() {
	
		container.shift(input.value);
		render();
	
}

function rightSideIn() {
	if(validate()) {
		container.push(input.value);
		render();
	}
}

function rightSideOut() {
	
		container.pop(input.value);
		render();
	
}

