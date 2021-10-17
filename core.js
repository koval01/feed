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
                            <img class="bd-placeholder-img card-img-top" width="100%" role="img" aria-label="Image"
                                src="${data[i].img_link}">
                            <div class="card-body">
                                <p class="card-text">${data[i].caption}</p>
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
