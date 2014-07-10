var clicker_bpc = 1;
var clicker_count = 0;
var clicker_timerIncrease = 0;

var clicker_timer = setInterval(function() {
	clicker_setCount(clicker_count + clicker_getTimerIncrease());
}, 1000);

var clicker_items = [];

function clicker_getTimerIncrease() {
	return clicker_timerIncrease;
}

function clicker_init() {
	// Setup store, etc

	// Plus One
	clicker_items["+1"] = {};
	clicker_items["+1"].button = clicker_createStoreItem("+1", 10);
	clicker_items["+1"].amt = 0;
	clicker_items["+1"].cost = 10;
	clicker_items["+1"].button.id = "clicker-plusonebutton";
	clicker_items["+1"].increase = 10;
	clicker_items["+1"].button.onclick = function() {
		if (clicker_count >= clicker_items["+1"].cost) {
			clicker_setCount(clicker_count - clicker_items["+1"].cost);
			clicker_items["+1"].amt += 1;
			clicker_bpc += 1;
			clicker_items["+1"].cost += clicker_items["+1"].amt * clicker_items["+1"].increase;
			clicker_items["+1"].increase += clicker_items["+1"].increase;
			document.getElementById("clicker-plusonebutton").firstChild.data = "+1 - $" + clicker_items["+1"].cost;
		}
	}
	document.getElementById("clicker-store").appendChild(clicker_items["+1"].button);

	// Worker
	clicker_items["worker"] = {};
	clicker_items["worker"].button = clicker_createStoreItem("Worker", 100);
	clicker_items["worker"].amt = 0;
	clicker_items["worker"].cost = 100;
	clicker_items["worker"].button.id = "clicker-workerbutton";
	clicker_items["worker"].increase = 10;
	clicker_items["worker"].timerAmt = 1;
	clicker_items["worker"].button.onclick = function() {
		if (clicker_count >= clicker_items["worker"].cost) {
			clicker_setCount(clicker_count - clicker_items["worker"].cost);
			clicker_items["worker"].amt += 1;
			clicker_timerIncrease += clicker_items["worker"].timerAmt;
			clicker_items["worker"].timerAmt += 1;
			clicker_items["worker"].cost += clicker_items["worker"].amt * clicker_items["worker"].increase;
			clicker_items["worker"].increase += clicker_items["worker"].increase;
			document.getElementById("clicker-workerbutton").firstChild.data = "Worker - $" + clicker_items["worker"].cost;
			console.log(clicker_timerIncrease);
		}
	}
	document.getElementById("clicker-store").appendChild(clicker_items["worker"].button);
}

function clicker_click() {
	clicker_count += clicker_bpc;
	clicker_setCount(clicker_count);
}

function clicker_createStoreItem(name, cost) {
	// Create button
	var button = document.createElement("button");
	var textnode = document.createTextNode(name + " - $" + cost);
	button.appendChild(textnode);

	var break_elem = document.createElement("br");
	document.getElementById("clicker-store").appendChild(break_elem);
	return button;
}

function clicker_setCount(amt) {
	clicker_count = amt;
	document.getElementById("clicker-bud-count").innerHTML = clicker_count;
}