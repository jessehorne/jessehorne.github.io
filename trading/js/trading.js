var outputMessage = function(type, msg) {
	var elem = document.getElementById("t-message");
	elem.className = "t-msg-" + type;
	elem.innerHTML = msg;
}

var generateData = function(opening, length, variable) {
	var data = [];

	for (var i=1; i<=length; i++) {
		var x = (Math.random()*variable);
		var posOrNeg = Math.floor(Math.random()*2);
		if (posOrNeg === 0) {
			opening = (opening - x).toFixed(2)/1;
		} else {
			opening = (opening + x).toFixed(2)/1;
		}
		data.push({x:i, y: opening});
	}

	return data;
}

var chart = new CanvasJS.Chart("t-graph", {
      title:{
      text: "Random Stock Data #1"
      },
       data: [
      {
        type: "line",

        dataPoints: generateData(54.0, 10000, 0.10)
      }
      ],
      zoomEnabled: true,
    });

chart.render();