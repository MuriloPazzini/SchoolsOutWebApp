function initReadBookCarousel() {
    $('#read-book-loading-section').show();
    $('#read-book-carousel').hide();

    let id = urlParam('book_id');

    var settings = {
        "url": baseUrl + "/api/comics/getById/" + id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        response.pages.forEach(page => {
            $('#read-book-carousel').append('<a class="carousel-item"><img src="' + page.image + '"></a>');
        });
        $('#read-book-loading-section').hide();
        $('#read-book-carousel').show();
        $('#read-book-carousel').carousel({
            numVisible: 3,
            noWrap: true
        });

    });
}

//events
$(document).ready(function () {
    initReadBookCarousel();
});