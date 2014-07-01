function pd_saveGame() {
	localStorage["pd_game"] = document.getElementById("body").innerHTML;
	document.getElementById("body").innerHTML = localStorage["pd_game"];
}


function pd_init() {
	if (typeof localStorage["pd_game"] === "undefined") {
		pd_createStore();
		pd_setMoney(5);
		pd_idCounter = 0;
		// pd_saveGame();
	} else {
		document.getElementById("body").innerHTML = localStorage["pd_game"];
	}
}

function pd_createElem(parent, type) {
	var elem = document.createElement(type);
	parent.appendChild(elem);
	return elem;
}

function pd_setMoney(amount) {
	document.getElementById("pd_money").innerHTML = amount;
}

function pd_getMoney() {
	return parseInt(document.getElementById("pd_money").innerHTML);
}

function pd_createStore() {
	var store = document.getElementById("pd_store");

	seed_items = [
		{name: "Shitiva", cost: 5, time: 10, sell: 7},
		{name: "Below Average Joe", cost: 10, time: 20, sell: 10},
		{name: "White Boy", cost: 20, time: 30, sell: 13},
		{name: "White Boy With A Job", cost: 40, time: 60, sell: 15},
		{name: "Average Joe", cost: 60, time: 90, sell: 20},
		{name: "Rich Boy", cost: 80, time: 120, sell: 30},
		{name: "Trippitonical", cost: 100, time: 200, sell: 50},
		{name: "Couchship Space X*100", cost: 120, time: 300, sell: 70},
		{name: "Obama", cost: 150, time: 500, sell: 100},
		{name: "Bubonic Chronic", cost: 200, time: 700, sell: 300},
	];

	for (var i in seed_items) {
		var tr_elem = document.createElement("tr");

		// Name
		var td_name = document.createElement("td");
		td_name.appendChild(document.createTextNode(seed_items[i].name));

		var td_cost = document.createElement("td");
		td_cost.appendChild(document.createTextNode(seed_items[i].cost));

		var td_time = document.createElement("td");
		td_time.appendChild(document.createTextNode(seed_items[i].time));

		var td_sell = document.createElement("td");
		td_sell.appendChild(document.createTextNode(seed_items[i].sell));

		var td_button = document.createElement("td");
		td_button.innerHTML = "<button onclick='pd_buy(" + i + ");'>Buy</button>";

		tr_elem.appendChild(td_name);
		tr_elem.appendChild(td_cost);
		tr_elem.appendChild(td_time);
		tr_elem.appendChild(td_sell);
		tr_elem.appendChild(td_button);

		store.appendChild(tr_elem);
	}
}

function pd_buy(seed) {
	if (pd_getMoney() >= seed_items[seed].cost) {
		pd_addSeed(seed);
		pd_setMoney(pd_getMoney() - seed_items[seed].cost);
	}
}

function pd_sell(seed, id) {
	pd_setMoney(pd_getMoney() + seed_items[parseInt(seed)].sell);
	var node = document.getElementById(id);
	node.parentNode.removeChild(node);
}

function pd_addSeed(seed) {
	pd_idCounter += 1;
	var items = document.getElementById("pd_items");

	var tr_elem = document.createElement("tr");
	tr_elem.id = "id" + pd_idCounter;

	var td_name = document.createElement("td");
	td_name.appendChild(document.createTextNode(seed_items[seed].name));

	var td_sell = document.createElement("td");
	td_sell.appendChild(document.createTextNode(seed_items[seed].sell));

	var td_time = document.createElement("td");
	td_time.id = "pd_time" + pd_idCounter;
	td_time.appendChild(document.createTextNode(seed_items[seed].time));

	var td_button = document.createElement("td");
	td_button.innerHTML = "<button onclick=\"pd_sell(" + seed + ", 'id" + pd_idCounter.toString() + "');\">Sell</button";

	tr_elem.appendChild(td_name);
	tr_elem.appendChild(td_sell);
	tr_elem.appendChild(td_time);
	
	var timer = setInterval(function () {
		var time = document.getElementById("pd_time" + pd_idCounter);
		var time_int = parseInt(time.innerHTML) - 1;
		time.innerHTML = time_int;
	}, 1000);

	var done = setTimeout(function() {
		tr_elem.appendChild(td_button);
		clearInterval(timer);
	}, seed_items[seed].time * 1000);

	items.appendChild(tr_elem);
}