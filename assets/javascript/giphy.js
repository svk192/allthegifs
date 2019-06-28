var topics = ["Bill Murray", "happy", "panda", "adorable","oprah"];

for(i=0; i < topics.length; i++){
    
    createbutton(topics[i]);
}

function createbutton (topicName){
    var button = $("<button>");
    button.attr("data-topic",topicName);
    button.text(topicName);
    button.addClass("button");
    $("#buttons").append(button);

}

$("#submit").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic").val().trim();
    topics.push(topic);
    createbutton(topic);
    $("#topic").val('');
});



$(document).on('click', 'button', function(){ 
console.log( $(this).text());

$("#gifcontainer").empty();    
    var topic = $(this).attr("data-topic");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&limit=10&rating=g&api_key=AynoT8MA5NAxjJDuytDktSN3pLeRwCYa";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function (response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var topicDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
         
          // Creating and storing an image tag
          var topicImage = $("<img>");
          topicImage.addClass("gif");
          topicImage.attr("data-state","still");
          // Setting the src attribute of the image to a property pulled off the result item
          topicImage.attr("src", results[i].images.fixed_height_still.url);
          topicImage.attr("data-still", results[i].images.fixed_height_still.url);
          topicImage.attr("data-animate", results[i].images.fixed_height.url);
          // Appending the paragraph and image tag to the animalDiv
          
          topicDiv.append(topicImage);
          topicDiv.append(p);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifcontainer").prepend(topicDiv);
        }
      });
  });

  $(document).on('click', '.gif', function(){ 
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });