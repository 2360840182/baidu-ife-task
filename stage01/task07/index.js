var mini_menu = document.getElementById("mini-menu");
var list = mini_menu.getElementsByTagName("li");
var clear = function() {
	for (let i=0; i < list.length; i++) {
		list[i].style.right = "-99px";
		mini_menu.style.height = "0";
	}
};

var dispose = function() {
	for (let i=0; i < list.length; i++) {
		list[i].style.right = "0px";
		mini_menu.style.height = "200px";
	}
};

mini_menu.addEventListener("mouseout", clear, false);
mini_menu.addEventListener("mousemove", dispose, false);
/*var mini_menu = document.getElementById('mini-menu');
var lis = mini_menu.getElementsByTagName("li");

mini_menu.addEventListener("mousemove", function() {
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.right = "0";
        mini_menu.style.height = "160px";
    }
}, false)
mini_menu.addEventListener("mouseout", function() {
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.right = "-99px";
           //mini_menu.style.height = "0";
        }
    }, false)*/