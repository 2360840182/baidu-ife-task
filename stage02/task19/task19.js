var input = document.getElementById("input"), 
	leftIn = document.getElementById("left-in"),
	leftOut = document.getElementById("left-out"),
	rightIn = document.getElementById("right-in"),
	rightOut = document.getElementById("right-out"),
	queue = document.getElementById("queue"),
	ranNum = document.getElementById("random-number");
	sort = document.getElementById("sort");
leftIn.addEventListener("click",leftSideIn);
leftOut.addEventListener("click",leftSideOut);
rightIn.addEventListener("click",rightSideIn);
rightOut.addEventListener("click",rightSideOut);
ranNum.addEventListener("click",genRandom);
sort.addEventListener("click",sortNum);
queue.addEventListener("click",function(e){ 
	var node = e.target;
	//Array.prototype == []???
	var index = Array.prototype.indexOf.call(node.parentNode.children, node);
	remove(index);
});

var container = new Array();

function genRandom() {
	container = [];
	for( var i=0; i < 60; i++) {
		container[i] = Math.floor((Math.random() * 90) + 10);
		console.log(container[i]);
	}
	render(...container);
	
}

function sortNum() {
	var k = 0;
	for(let i = container.length; i>0; i--) {
		for(let j = 0; j < i - 1; j++) {
			if(container[j] > container[j + 1]) {
				var temp = container[j];
				[container[j], container[j + 1]] = [container[j + 1], container[j]];
				//let container = container;不晓得这句话为啥会报错
				k=k+1;
				function ee(...container) {
					return function() {
						render(...container);
					}
				}
				(function(k){setTimeout(ee(...container),k);})(k);
				
			}
		}
	}
}

function remove(index) {
	container.splice(index,1);
	render();
}

function isOverflow() {
	if(container.length === 60) {
		return true;
	}
	return false;
}

function validate() {
	//非数字的正则表达式不能检测出空格
	if(input.value=="" || /[^0-9]/g.test(input.value)){
		alert("请输入数字");
		return false;
	}
	if(input.value < 10 || input.value > 100) {
		alert("限制输入的数字在10-100");
		return false;
	}

	if(isOverflow()) {
		alert("队列元素数量最多限制为60个");
		return false;
	}
	return true;
}

function render(...container) {
	var content = "",height = "";
	for(var i=0, j = arguments.length; i < j; i++) {
		height =arguments[i] * 2;
		content += '<div class="bar" style="background-color:#2288'+arguments[i] + ';' + 
		'margin-left: 2px;width: 10px;height: '+ height +'px;">'  + '</div>';
	}
	queue.innerHTML = content;
}

function leftSideIn() {
	if(validate()) {
		//这里value是字符串
		container.unshift(input.value);
		render(...container);
	}
	
}
function leftSideOut() {
	
		container.shift(input.value);
		render(...container);
	
}

function rightSideIn() {
	if(validate()) {
		container.push(input.value);
		render(...container);
	}
}

function rightSideOut() {
	
		container.pop(input.value);
		render(...container);
	
}

