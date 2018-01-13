var topics = ["The Beatles", "The Doors", "Grateful Dead", "Jefferson Airplane"]

//adds the search terms to a button and displays the button in the div.
function renderButtons() {
    $("#button-box").empty();
    for (let i=0; i<topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("searchterms btn btn-primary");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#button-box").append(newButton);
    }
    console.log(topics)

    $(".searchterms").on("click", function () {
        console.log("test")
        $("#gif-box").empty();
        var searchTerm = $(this).attr("data-name");
        searchTerm = searchTerm.replace(" ", "+");
        $.ajax({
            url: queryURL + "q=" + searchTerm,
            method: "GET"
        }).done(function (response) {
            console.log(response)
            var imgArr = response.data
            for (i = 0; i < imgArr.length; i++) {
                var fixedImgURL = response.data[i].images.fixed_width_still.url
                var movingImgURL = response.data[i].images.fixed_width.url
                var rating = response.data[i].rating
                var newImg = $("<img>");
                newImg.attr({
                    "src": fixedImgURL,
                    "data-still": fixedImgURL,
                    "data-animate": movingImgURL,
                    "data-state": "still",
                    "width": "50%",
                    "class": "gifs"
                });
                var ratingText = $("<p>");
                ratingText.text("Rating: " + rating);
                var newDiv = $("<div>");
                newDiv.attr({
                    "class": "gifboxes",
                    "width": "40%",
                });
                newDiv.append(newImg);
                newDiv.prepend(ratingText);
                $("#gif-box").prepend(newDiv);
            }
            $(".gifs").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    })
}

renderButtons();

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hXLKYWsEie9tH97LMJNLhV0fcAJghusc&limit=10&"

$("#add-search-term").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#search-term-input").val();
    
    topics.push(searchTerm);
    renderButtons();
});




