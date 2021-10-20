var first_load = false;
var load_freeze = false;
var error_loading = false;

function imgError(o) {
    return (o.onerror = ""), (o.src = background_static__), !0
}

addStyle("bootstrap", {
    html: "<div>\n<span data-notify-text></span>\n</div>",
    classes: {
        base: {
            "font-weight": "bold",
            "padding": "8px 15px 8px 14px",
            "text-shadow": "0 1px 0 rgba(255, 255, 255, 0.5)",
            "background-color": "#fcf8e3",
            "border": "1px solid #fbeed5",
            "border-radius": "4px",
            "white-space": "nowrap",
            "padding-left": "25px",
            "background-repeat": "no-repeat",
            "background-position": "3px 7px"
        },
        error: {
            "color": "#B94A48",
            "background-color": "#F2DEDE",
            "border-color": "#EED3D7",
            "background-image": "none",
        },
        success: {
            "color": "#468847",
            "background-color": "#DFF0D8",
            "border-color": "#D6E9C6",
            "background-image": "none",
        },
        info: {
            "color": "#3A87AD",
            "background-color": "#D9EDF7",
            "border-color": "#BCE8F1",
            "background-image": "none",
        },
        warn: {
            "color": "#C09853",
            "background-color": "#FCF8E3",
            "border-color": "#FBEED5",
            "background-image": "none",
        }
    }
});

function request(callback) {
    $.ajax({
        url: "https://endlessness.herokuapp.com/random",
        type: "GET",
        success: function (result) {
            try {
                if (result.success) { callback(result.posts) }
                else { callback(result.success) }
            } catch { callback(false) }
        },
        timeout: 29599
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
                            </div>
                        </div>
                    `)
                }
                error_loading = false
            } else { error_loading = true }
        } catch { error_loading = true, console.log("Error check data!") }
        if (!error_loading) { $("#spinnerload").css("display", "none") }
        else { $.notify("Loading error!", "info"); }
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
            load_freeze = true, get_posts() }
    });
    
    setInterval(function() {
        if (error_loading) { get_posts(), error_loading = false }
    }, 200);
});
