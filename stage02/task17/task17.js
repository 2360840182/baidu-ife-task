/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

//以下两个函数用于随机模拟生成测试数据
//把Date对象变成字符串格式
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}
//返回一个对象，对象的键是精确到每天的日期格式，对象的值是随机的数。
function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = '';
	for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};

var charData = {

};

var pageState = {
	nowSelectCity: -1,
	nowGraTime: "day"
}
/*
*day[city][dateFormat] = {
				data: airIndex,
				height: airIndex * 0.75 + 'px',
				width: '14px',
				color: randomColor(),
				title: city + dateFormat,
				date:  dateFormat.slice(8,10)
			};
*/
function renderChart() {
	var chart_wrap = document.getElementById("aqi-chart-wrap");
	let city = pageState["nowSelectCity"];
	let time = pageState["nowGraTime"];
	let graData = charData[time][city];
	console.log(graData);
	
	var style = "style='width:{width};height:{height};background-color:rgba({color},0.6)' ";
	var title = "title='{title}的空气质量指数为:{data}'";
	var allCss = "<div " + style + title + "><span>{date}</span></div>";
	var html = "";
	//这里字符串为什么不能换行呢,换行了replace就没用了,因为作用的字符串不一样了
	for (var i in graData) {
		html += allCss.replace('{width}', graData[i].width)
		.replace('{color}',graData[i].color)
		.replace('{height}',graData[i].height)
		.replace('{title}',graData[i].title)
		.replace('{data}',graData[i].data)
		.replace('{date}',graData[i].date);
	}
	console.log(html);
	chart_wrap.innerHTML = html;
}

function randomColor() {
	var color = {
		r: Math.floor(Math.random()*255),
		g: Math.floor(Math.random()*255),
		b: Math.floor(Math.random()*255)
	}
	//console.log(color.r + "," + color.g + "," + color.b)
	return color.r + "," + color.g + "," + color.b;
}

function graTimeChange(e) {
	//如果采用【】方法查询对象，那么键名一定要加上“”
	pageState["nowGraTime"] = e.target.value;
	renderChart();
}

function citySelectChange(e) {
	//如果value不在元素标签内，那就在内容区域去找
	pageState["nowSelectCity"] = e.target.value;
	renderChart();
}

function initGraTimeForm() {
	var form_gra_time = document.getElementById("form-gra-time");
	/*
	function change () {
		console.log('change')
	}*/
	form_gra_time.addEventListener("change", graTimeChange, false);
}

function initCitySelector() {
	var cityStorage = "";
	for (var city in aqiSourceData) {
		cityStorage += "<option>" + city + "</option>";
	}
	//console.log(cityStorage);
	var citySelect = document.getElementById("city-select");
	citySelect.innerHTML = cityStorage;
	citySelect.addEventListener("change", citySelectChange, false);
}

function initAqiChartData() {
	/*
	*
	*/
	var day = {};
	var week = {};
	for (var city in aqiSourceData) {
		day[city] = {};
		week[city] = {};
		weekCount = 0;
		weekTotalIndex = 0;
		weekNum = 0;
		for (var dateFormat in aqiSourceData[city]) {
			var airIndex = aqiSourceData[city][dateFormat];
			//日数据
			day[city][dateFormat] = {
				data: airIndex,
				height: airIndex * 0.75 + 'px',
				width: '14px',
				color: randomColor(),
				title: city + dateFormat,
				date:  dateFormat.slice(8,10)
			};
			//周数据
			weekCount++;
			weekTotalIndex += airIndex;
			if(weekCount==7 || dateFormat == "2016-3-31") {
				weekNum++;
				var key = '第' + weekNum + '周';
				let airIndex = (weekTotalIndex / weekCount).toFixed(2);

				weekCount = 0;
				weekTotalIndex = 0;
				week[city][key] = {
					data: airIndex,
					height: airIndex * 0.75 + 'px',
					width: '50px',
					color: randomColor(),
					title: city + key,
					date: key
				};
			}
		}

	}
	charData.week = week;
	charData.day = day;
}

function init() {
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();

	if (pageState['nowSelectCity'] == -1) {
        pageState['nowSelectCity'] = '北京';
        renderChart();
    }
	
}

init();