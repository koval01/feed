function imgError(o) {
    return (o.onerror = ""), (o.src = background_static__), !0
}

function get_suggestions() {
    $.ajax({
        url: "https://feedimages.herokuapp.com/random",
        type: "GET",
        success: function (result) {
            let posts = result.posts
            console.log(posts)
        },
        timeout: 29999
    })
}

$().ready(function() {
    get_suggestions()
});
