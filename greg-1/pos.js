$(document).ready(function() {
    function get_file_name(filename) {
        return filename.substring(filename.lastIndexOf("/") + 1);
    }

    function build_string(tag, text) {
        return "<" + tag + ">" + text + "</" + tag + ">";
    }

    contents = "";
    filename = get_file_name(window.location.pathname);

    $.get(filename, function(data) {
        contents = data;
    });

    $(document).click(function(event) {
        // event.preventDefault();
        var tag = event.target.tagName.toLowerCase();
        var text = $(event.target).text();
        var length = text.length;
        var position_start = contents.indexOf(build_string(tag,
            text));
        var position_end = position_start + length;

        console.log(position_start, position_end);
        console.log(contents.length)
    });
});
