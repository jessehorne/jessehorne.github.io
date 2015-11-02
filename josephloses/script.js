var strings = [
    "yup",
    "yuppity",
    "yuppers",
    "yuppapalooza",
    "yuppedeh",
    "yoop"
];

function makeJosephLose() {
    document.getElementById("wat").style["display"] = "none";

    var buffer = "";

    for (var i = 0; i < 10000; i++) {
        var which = Math.floor(Math.random() * strings.length);

        buffer = buffer + strings[which] + " ";

        if (buffer.length > 200) {
            document.getElementById("wat2").innerHTML += buffer;
            buffer = "";
        }
    }

    prettify();
}

function prettify() {
    setTimeout(function() {
        requestAnimationFrame(prettify);
    }, 100);

    var r = Math.floor(Math.random() * 255) / 2;
    var g = Math.floor(Math.random() * 255) / 2;
    var b = Math.floor(Math.random() * 255) / 2;

    document.getElementById("wat2").style["color"] = "rgb(" + r + "," + g + "," + b + ")";

    var r = Math.floor(Math.random() * 255) / 2;
    var g = Math.floor(Math.random() * 255) / 2;
    var b = Math.floor(Math.random() * 255) / 2;

    document.getElementById("wat2").style["background-color"] = "rgb(" + r + "," + g + "," + b + ")";

    var randomSize = 10 + Math.floor(Math.random() * 32);

    document.getElementById("wat2").style["font-size"] = randomSize;
}
