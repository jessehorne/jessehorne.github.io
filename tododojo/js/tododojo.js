
var itemText = "<tr id='ITEMITEMID'>\
			<td class='uk-width-1-10'>ITEMID</td>\
			<td class='uk-width-8-10'>ITEMTEXT</td>\
			<td class='uk-width-1-10'><a class='uk-icon-medium uk-icon-times' onclick=\"deleteItem('ITEMITEMID');\" href=''></a></td>\
			</tr>"

var itemCount = 0;

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function checkList() {
	var isEmpty = document.getElementById("list").innerHTML == "" ? true : false;
	return isEmpty;
}

function loadToDo() {
	if (typeof localStorage["todo-items"] !== "undefined") {
		document.getElementById("list").innerHTML = localStorage["todo-items"];
	}

	if (typeof localStorage["todo-count"] !== "undefined") {
		itemCount = localStorage["todo-count"];
	} else {
		itemCount = 0;
	}
}

function createItem() {
	var text = itemText;
	itemCount = parseInt(itemCount) + 1;
	// itemText = itemText.replace("INSERT_ID", itemCount);
	text = replaceAll("ITEMID", itemCount.toString(), text);
	text = text.replace("ITEMTEXT", document.getElementById("textinput").value);
	document.getElementById("list").innerHTML += text;
	document.getElementById("textinput").value = "";
	saveList();
}

function deleteItem(item) {
	$("#"+item).remove();
	console.log(document.getElementById("list").innerHTML);
	saveList();
}

function saveList() {
	localStorage["todo-items"] = document.getElementById("list").innerHTML;
	localStorage["todo-count"] = itemCount;
}

function clearList() {
	localStorage["todo-items"] = "";
	localStorage["todo-count"] = 0;
}

function printTest() {
	console.log("test");
}