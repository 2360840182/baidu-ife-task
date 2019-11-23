function TagBase(divContainer) {
	this.queue = [];
	this.render = function() {
		var content = "";
		for (var i in this.queue) {
			content += '<button onmouseover="showDelInfo(event)" onmouseout="hideDelInfo(event)"' +
			'style="background: yellow;margin: 20px; padding:10px;border: 0px;">' + 
			this.queue[i] + '</button>';
		}
		divContainer.getElementsByClassName('show').innerHTML = content;
	}
	this.del = function(index) {
		tagArray.splice(index, 1);
	}
	
	
}

function TagChild(divContainer) {
	TagBase.call(this, divContainer);
}
	



var tag_input = document.getElementById("tag-input");
var tag = document.getElementById("tag");
tag.addEventListener("click",function(e) {
	//草，这里失误了，搞了很久才发生是字符串的锅
	if(e.target && e.target.nodeName == "BUTTON") {
		del([].indexOf.call(e.target.parentNode.children,e.target));
		render();
	}
});


//数组的话，不好处理队列的情况

function checkTag(e) {
	var str1 = tag_input.value;
	//不清楚为什么这里匹配不了回车，按了，键后才能匹配回车？
	//使用了keyCode后，又不能用换行了,回车输入少一个字符
	if(e.keyCode == 13 || e.keyCode == 32 || /[,，/s]/.test(str1.charAt(str1.length - 1))) {
		key = str1.substring(0,str1.length-1);
		addTag(key);
		render();
		//这里空字符串和空对象表现结果一样
		tag_input.value = null;
	}
}

function addTag(key) {
	trimKey = key.trim();
	for(var i in tagArray) {
		if( tagArray[i] ===trimKey) return;
	}
	if(tagArray.length ==10) {
		tagArray.shift();
	}
	tagArray.push(trimKey);
}



function showDelInfo(e) {
	console.log(e);
	e.target.innerHTML = "删除" + e.target.innerHTML;
}

function hideDelInfo(e) {
	e.target.innerHTML = e.target.innerHTML.slice(2,e.target.innerHTML.length);
}

document.getElementById("commitHobby").addEventListener("click",genHobby);
var hobbyArray = [];
function genHobby() {
	let input = document.getElementById("textArea").value;
	let temp = input.replace(/[,，、/s]/g,'|');
	inputArray = temp.split('|');
	let tempArray = hobbyArray;
	for (var i in inputArray) {
		if (tempArray.indexOf(inputArray[i].trim()) == -1) {
			tempArray.push(inputArray[i].trim());
		}	
	}
	if (tempArray.length > 10) {
		tempArray.splice(0,tempArray.length - 10);
	}
	hobbyArray = tempArray;
	render1();
}

function render1() {
	var content = "";
	for (var i in hobbyArray) {
		content += '<button ' +
		'style="background: yellow;margin: 20px; padding:10px;border: 0px;">' + 
		hobbyArray[i] + '</button>';
	}
	hobby.innerHTML = content;
}