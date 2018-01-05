var topics = ["The Beatles", "The Doors", "Grateful Dead", "Jefferson Airplane"]

function renderButtons() {
    $("#button-box").empty();
    for (i=0; i<topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("ntlparks btn btn-default");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#button-box").append(newButton);
    }
}

renderButtons();

var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=hXLKYWsEie9tH97LMJNLhV0fcAJghusc&limit=10&"

$(".ntlparks").on("click", function(){
    $("#gif-box").empty();
    var searchTerm = $(this).attr("data-name");
    searchTerm = searchTerm.replace(" ", "+");
    $.ajax({
        url: queryURL + "q=" + searchTerm,
        method: "GET"
    }).done(function (response) {
        var imgArr = response.data
        for (i=0; i<imgArr.length; i++){
            var imgURL = response.data[i].images.fixed_width.url
            var newImg = $("<img>");
            newImg.attr("src", imgURL);
            newImg.attr("width", "50%");
            var newDiv = $("<div>");
            newDiv.attr("class", "well");
            newDiv.attr("width", "40%");
            newDiv.append(newImg);
            $("#gif-box").prepend(newDiv);
        }
    })
})