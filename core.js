var first_load = false;
var load_freeze = false;

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
    if (!first_load) { first_load = true }
    $("#spinnerload").css("display", "flex");
    request(function(data) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].caption) { data[i].caption = "No caption 🗿" }
                $("#posts_row").append(`
                    <div class="col">
                        <div class="card shadow-sm">
                            <img class="bd-placeholder-img card-img-top" width="100%" role="img" aria-label="Image"
                                src="https://feedimages.herokuapp.com/image?l=${data[i].img_link}">
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
        $("#spinnerload").css("display", "none");
        load_freeze = false;
    })
}

$().ready(function() {
    get_posts();
    
    $(window).scroll(function () {
        let scrollPosition = window.pageYOffset;
        let windowSize = window.innerHeight;
        let bodyHeight = document.documentElement.scrollHeight;
        let trigger = Math.max(bodyHeight - (scrollPosition + windowSize), 0);

        if (trigger < 250 && first_load && !load_freeze) {
            load_freeze = true;
            get_posts()
        }
    });
    
    setInverval(get_posts, 5000);
});
