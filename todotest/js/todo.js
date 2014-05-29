var itemText = "<div class='item' id='itemINSERT_ID'>INSERT_TEXT\
<a href='' class='new' onclick='deleteItem(\"itemINSERT_ID\");'>x</a>\
</div>"

var itemCount = 0;

function checkList() {
	var isEmpty = document.getElementById("list").innerHTML == "" ? true : false;
	return isEmpty;
}

function loadToDo() {
	console.log("test");
	if (typeof localStorage["todo-items"] !== "undefined") {
		document.getElementById("list").innerHTML = localStorage["todo-items"];
	} else {
		document.getElementById("list").innerHTML = "No items...";
	}
}

function createItem() {
	itemCount += 1;
	// itemText = itemText.replace("INSERT_ID", itemCount);
	replaceAll("INSERT_ID", itemCount, itemText);
	itemText = itemText.replace("INSERT_TEXT", document.getElementById("textinput").value);
	document.getElementById("list").innerHTML += itemText;
	document.getElementById("textinput").value = "";
	saveList();
}

function deleteItem(item) {
	var div = document.getElementById(item);
	div.parentNode.removeChild(div);
	saveList();
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function saveList() {
	localStorage["todo-items"] = document.getElementById("list").innerHTML;
}