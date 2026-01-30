var catpicture = {
    src: "images/lobster.jpg",
    width: "500px"
};

var dogpicture = {
    src: 'https://c.pxhere.com/photos/21/f2/vineyard_vine_breathtaking_views_beautiful_amazing_green_greenery-649626.jpg!d',
    width: "200px"
};

// var pics = [catpicture, dogpicture];
var next = catpicture

$(document).ready(function() {

    var x = 2 + 2;

    console.log(x);

    var clickButton = $('#clicker')
    var catRebellion = function() {
        $(".jumbotron").css("background-image", "url('images/lobster.jpg'")

        $('#jumbotext').html("Cats Cats Cats");
        $('img').attr("src", next.src);
        $('img').attr("width", next.width);
        if (next == catpicture) {
            next = dogpicture;
        } else {
            next = catpicture;
        }

        $("#heading").html("ALL ABOUT CATS!");

        $(".animal").html("cats!");
    }
    clickButton.click(catRebellion)
    // For this one, you don't have to click it, just move you mouse over it.
    // clickButton.mouseover(catRebellion)

})
