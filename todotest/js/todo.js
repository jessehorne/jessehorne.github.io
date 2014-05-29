var itemText = "<div class='item' id='itemINSERT_ID'>INSERT_TEXT\
<a href='#' class='new' onclick='deleteItem(\"itemINSERT_ID\");'>x</a>\
</div>"

var itemCount = 0;

function checkList() {
	var isEmpty = document.getElementById("list").innerHTML == "" ? true : false;
	return isEmpty;
}

function loadToDo() {
	if (checkList() == true) {
		document.getElementById("list").innerHTML = "No items...";
	}
}

function createItem() {
	if (itemCount == 0) {
		document.getElementById("list").innerHTML = "";
	}
	itemCount += 1;
	// itemText = itemText.replace("INSERT_ID", itemCount);
	replaceAll("INSERT_ID", itemCount, itemText);
	itemText = itemText.replace("INSERT_TEXT", document.getElementById("textinput").value);
	document.getElementById("textinput").value = "";
	document.getElementById("list").innerHTML += itemText;
}

function deleteItem(item) {
	var div = document.getElementById(item);
	div.parentNode.removeChild(div);
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}