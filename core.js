var first_load = false;
var load_freeze = false;
var error_loading = false;
var notify_hidden = true;

function notify(text) {
    const error_box = $(".error_box");
    const error_text = $(".error_text");
    
    let ready = false;
    
    if (notify_hidden) { ready = true } 
    else { error_box.css("margin-bottom", "-50px"), ready = true }
    
    if (ready) {
        error_text.text(text);
        error_box.css("margin-bottom", "0");
        setTimeout(function() { error_box.css("margin-bottom", "-50px") }, 2500);
    }
}

function imgError(o) {
    return (o.onerror = ""), (o.src = background_static__), notify("Error loading photo!"), !0
}

function request(callback) {
    $.ajax({
        url: "https://backend.q-writer.com/random",
        type: "GET",
        success: function (result) {
            if (result.success) { callback(result.posts) }
            else { callback(result.success) }
        },
        error: function (e) { callback(false) },
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
                                    src="https://backend.q-writer.com/image?l=${data[i].img_link}">
                            </div>
                        </div>
                    `)
                }
                error_loading = false
            } else { error_loading = true }
        } catch { error_loading = true, console.log("Error check data!") }
        if (!error_loading) { $("#spinnerload").css("display", "none") }
        else { notify("Error loading feed from server!") }
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
            load_freeze = true, get_posts() }
    });
    
    setInterval(function() {
        if (error_loading) { get_posts(), error_loading = false }
    }, 2000);
});
