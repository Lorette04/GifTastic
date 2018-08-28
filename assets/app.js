        // CREATING LIST OF BUTTONS AND SEARCH BOX
        // Initial array of French items
        var topics = ["Paris", "Baguette", "Wine France", "Pigeon", "Beret France", "Moulin Rouge", "Paris skateboard", "Croissant", "Camembert", "Raclette", "Soccer France"];



        // PUBLISHING GIFS WHEN BUTTON CLICKED
        // Event listener for all button elements
        // $("button").on("click", function (event) {

        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        // event.preventDefault();
        function displayTopicContent() {


            // Here we grab the text from the input box
            var france = $(this).attr("data-name");
            if (!france){
                france = $("#france-input").val().trim(); //grabs the text from the input box
            }
            console.log(!!france);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + france + "&apikey=21z1AkMTbXKKh2JLuVOFUFROZHQc7TDe&limit=10";
            var tBody = $("<tbody>");
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(queryURL);

                    var topicDiv = $("<div class='topic'>");

                    var results = response.data;
                    console.log(response);

                    // Looping through each result item 
                    for (var i = 0; i < results.length; i++) {
                        var franceDiv = $('<div class="col-md-4 col-12">');
                        var p = $("<p>").text("Rating: " + results[i].rating); //Rating tag for each results

                        var franceImage = $("<img>");
                        franceImage.attr("src", results[i].images.fixed_height.url);

                        franceImage.attr("data-still", results[i].images.fixed_height_still.url);
                        franceImage.attr("data-animate", results[i].images.fixed_height.url);
                        franceImage.attr("data-state", "still");
                        franceImage.addClass("img-fluid gif border border-primary");

                        franceDiv.append(p);
                        franceDiv.append(franceImage);

                        $("#gifs-appear-here").prepend(franceDiv);

                    }
                    //Pausing GIFS
                    $(".gif").on("click", function () {
                        var state = $(this).attr("data-state");
                        $(this).attr("data-state", "animate");
                        console.log(state)
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
                        console.log(state);

                    });

                });

        }

        //Function to display the French items in buttons
        function renderButtons() {

            $("#france-view").empty();
            for (var i = 0; i < topics.length; i++) {
                var a = $("<button>");
                // Adding a class
                a.addClass("btn btn-primary");
                // Adding a data-attribute with a value of the topic at index i
                a.attr("data-name", topics[i]);
                // Providing the button's text with a value of the topic at index i
                a.text(topics[i]);
                // Adding the button to the HTML
                $("#france-view").append(a);
            }
        }

        // Handling events where button is clicked
        $("#add-franceItem").on("click", function (event) {

            event.preventDefault(); //allows the user to click enter instead of cliking the button to validate the search

            var topic = $("#france-input").val().trim(); //grabs the text from the input box
            topics.push(topic);

            console.log(topic);
            renderButtons();
        });
        $(document).on("click", ".btn", displayTopicContent);

        renderButtons();


