function imgError(o) {
    return (o.onerror = ""), (o.src = background_static__), !0
}

function request(callback) {
    $.ajax({
        url: "https://feedimages.herokuapp.com/random",
        type: "GET",
        success: function (result) {
            if (result.success) { callback(result.posts) }
            else { callback(result.success) }
        },
        timeout: 29999
    })
}

function get_posts() {
    request(function(data) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
               $("#posts_row").append(`
                    <div class="col">
                        <div class="card shadow-sm">
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"/>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                            </svg>
                            <div class="card-body">
                                <p class="card-text"></p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">❤️ ${data[i].likes_count}</small>
                                </div>
                            </div>
                        </div>
                    </div>
               `)
            }
        }
    })
}

$().ready(function() {
    get_posts()
});
