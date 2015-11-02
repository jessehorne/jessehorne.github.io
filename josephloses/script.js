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
}
