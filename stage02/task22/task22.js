
var sortArray = [];
var root = document.getElementById("root");
document.getElementById("btn1").addEventListener("click", function() {
	if (flag === true) {
		alert("正在执行");
		return;
	}
	flag = true;
	sortArray = [];
	preSort(root);
	render();
});
document.getElementById("btn2").addEventListener("click", function() {
	sortArray = [];
	midSort(root);
	render();
});
document.getElementById("btn3").addEventListener("click", function() {
	console.log(1);
	if (flag === true) {
		alert("正在执行");
		return;
	}
	flag = true;
	sortArray = [];
	latSort(root);
	console.log(sortArray);
	render();
});

//该函数能不能解决问题，取决于左节点调用和有节点调用能否解决问题。

function preSort(root) {
	sortArray.push(root);
	if(root.firstElementChild != null) {
		preSort(root.firstElementChild);
	}
	if(root.lastElementChild != null) {
		preSort(root.lastElementChild);
	}
}
function midSort(root) {
	if(root.firstElementChild != null) {
		midSort(root.firstElementChild);
	}
	sortArray.push(root);
	if(root.lastElementChild != null) {
		midSort(root.lastElementChild);
	}
}

function latSort(root) {

	if(root.firstElementChild != null) {
		latSort(root.firstElementChild);
	}
	if(root.lastElementChild != null) {
		latSort(root.lastElementChild);
	}
	sortArray.push(root);
}

var i = 0;
var flag = false;
var render = function() {
	
	if (i == sortArray.length) {
		sortArray[i-1].style.backgroundColor = "white";
		i = 0;
		flag = false;
		return;
	}
	if(sortArray[i-1]) {
		sortArray[i-1].style.backgroundColor = "white";
	}
	sortArray[i].style.backgroundColor = "blue";
	setTimeout(render,500);
	i++;
}