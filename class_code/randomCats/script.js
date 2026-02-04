$(document).ready(function() {
    var x = 2 + 2;
    var catpicture = {
        src: "images/cat.jpg",
        width: "500px"
    };

    var dogpicture = {
        src: "images/dogs.jpeg",
        width: "300px"
    };

    var next = catpicture;

    console.log(x);

    console.log("Hello!");

    var catRebellion = function() {
        $(".jumbotron").css("background-image", "url('images/cats.webp')");

        $('#jumbotext').html("CATS CATS CATS");

        $("img").attr("src", next.src);
        $("img").attr("width", next.width);
        if (next == catpicture) {
            next = dogpicture;
        } else {
            next = catpicture;
        }

        $("#heading").html("ALL ABOUT CATS!");

        $(".animal").html("cats!");
    }

    var clickButton = $("#clicker");
    clickButton.click(catRebellion);

});