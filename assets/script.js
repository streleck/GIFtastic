//make original set of buttons
var topics = ["dunk", "layup", "assist", "pass", "foul", "blooper", "funny"];

for (i=0; i<topics.length; i++){
	$("#button-pile").append("<button class='topic-btn' id='" + topics[i] + "' type='button' clicks='0'>" + topics[i] + "</button>");
}



function gifSearch(word){
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        word + "&limit=10&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		console.log(response);


	//for each of the 10 opbects returned, make a new div. Put in the rating into a span. Then put the addresses for the gif and still into an img tag, the attrbutes of which can then be used to toggle between gif and still.
		for (j=0; j<10; j++){
			var newDiv = $("<div class='gif-box'>");;
			var newGif = $("<img class='gif'>");
			newGif.attr("src", response.data[j].images.original_still.url);
			newGif.attr("data-still", response.data[j].images.original_still.url);
			newGif.attr("data-animate", response.data[j].images.original.url);
			newGif.attr("data-state", "still");
			// newGif.attr("class", "frank");
			newDiv.append(newGif);
			newDiv.append("<div>Rating: " + response.data[j].rating + "</div>")
			$("#gif-dump").append(newDiv);
		}
	})
}

//when button is pressed, search term and display resulting stills/ratings
$("#button-pile").on("click", ".topic-btn", function(){
	var searchTerm = $(this).attr("id") + "%20basketball";
	gifSearch(searchTerm);
	$("#gif-dump").html("");
});


$("#gif-dump").on("click", ".gif", function(){
	var state = $(this).attr("data-state");
	if (state === "still"){
        var animateURL = $(this).attr("data-animate");
        $(this).attr("src", animateURL);
        $(this).attr("data-state", "animate");
	}
    else{
        var stillURL = $(this).attr("data-still");
        $(this).attr("src", stillURL);
        $(this).attr("data-state", "still");
    	}
      
});


//When add button is pressed, take contents of the search field and turn them into a new search button
$("#search-button").on("click", function(){

	$("#button-pile").html("");
	topics.push($("#search-bar").val());
	
	for (i=0; i<topics.length; i++){
		$("#button-pile").append("<button class='topic-btn' id='" + topics[i] + "' type='button' clicks='0'>" + topics[i] + "</button>")
	};
});


