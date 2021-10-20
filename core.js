var first_load = false;
var load_freeze = false;
var error_loading = false;

function imgError(o) {
    return (o.onerror = ""), (o.src = background_static__), !0
}

function request(callback) {
    $.ajax({
        url: "https://endlessness.herokuapp.com/random",
        type: "GET",
        success: function (result) {
            if (result.success) { callback(result.posts) }
            else { callback(result.success) }
        },
        timeout: 29999
    })
}

function get_posts() {
    $("#spinnerload").css("display", "flex");
    request(function(data) {
        try {
            if (data && data.length > 1) {
                if (!first_load) { first_load = true }
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].caption) { data[i].caption = "No caption 🗿" }
                    $("#posts_row").append(`
                        <div class="col">
                            <div class="card shadow-sm">
                                <img class="bd-placeholder-img card-img-top" width="100%" role="img" aria-label="Image"
                                    src="https://endlessness.herokuapp.com/image?l=${data[i].img_link}">
                                <!-- <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <small class="text-muted">
                                            ❤️ ${data[i].likes_count} | 
                                            <a href="https://www.instagram.com/p/${data[i].shortcode}/" 
                                                target="_blank">Go to post</a>
                                        </small>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    `)
                }
                error_loading = false
            } else { 
                error_loading = true 
            }
        } catch {
            console.log("Error check data!")
        }
        if (!error_loading) {
            $("#spinnerload").css("display", "none") 
        }
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

        if (trigger < (25 * 5000) && first_load && !load_freeze) {
            load_freeze = true;
            get_posts()
        }
    });
    
    setInterval(function() {
        if (error_loading) { get_posts(), error_loading = false }
    }, 200);
});
