
$(function() {

	/*	
	
	A search form that allows users to search YouTube videos.
	filter the results & show thumbnail of searched videos.

*/	


	// Put get request on page.
	$('#search-term').submit(function(event) {
		event.preventDefault();
		if ($('#query').val() !== "") {
			//creates a variable named searchTerm to store the input data (value --> val(); ) from search box,"#query".
			var searchTerm = $('#query').val();
			
			// Calls the getRequest function to run what this function does.
			getRequest(searchTerm);
			$('#query').val('');
			$('.search-tip').slideup(100);					
		}
	});

	//Clearbutton clears the search
		$('#clearhButton').click(function () {
			$('#search-results').empty();
			$('.search-tip').slideDown('slow');
			
		});

		// Same as above but by pressing "enter"
		$(document).keydown(function() {
			if (event.which === 13 && $('#query').val() !== "") {
				$('#searchButton').trigger('click');				
				$('.search-tip').slideup(100);		
			}
		});
});

	/*

	// gets the specific JSON data searchTerm is used as the 'query' used by the user to filter search.
	function getRequest(searchTerm) {
		//data.Search refines the array to only show information stored in the Search Array.
		$.getJSON('http://www.omdbapi.com/?s=' + searchTerm + '&r=json', function(data) {
			//showResults function is fired.
			showResults(data.Search);
		});
	}
	*/

	// A more clean way of doing getRequest()

	function getRequest (searchTerm) {
		// The parameters needed for the API to function
		var params = {
			part: 'snippet',
			key: 'AIzaSyBOvqBGe6x3vvqIoqqh4Uzova4qlJt-U_0',
			q: searchTerm,			
		};
		//This url is the endpoint - is required to send the request to. --> endpoint is what is being read by the server.
		url = 'https://www.googleapis.com/youtube/v3/search';

		//Data is the "variable" defined to store the information from the server.
		$.getJSON(url, params, function(data) {		
				
			showResults(data.items);
		});
	}

	/*
	 Appends the results of the JSON file to $('#search-results') div
	 "Results" is the parameter given to store the data recieved from the server.
	*/
	function showResults(results){
		// console.log(results[0].snippet.title);
		/*
		$.each() is a function designed for itterating the results. index can be called "i" + value is the properties of that looped array.
		Then the "results" is transformed into "item".
		*/

		$.each(results, function(index,item){
			// Selects the youtube thumbnail image
			var youtubeImage = item.snippet.thumbnails.medium.url;
			if (item.id.videoId !== undefined) {

				//correct one
				var youtubeMovie = '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '">' + item.id.videoId +'</a>';			
				var searchMe = '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img class="uthumb" src="' + youtubeImage + '"></a>';
				//Appends the array value, in this case "item.snippet.something" to div #search-results
				$('#search-results').append(searchMe);
				// console.log(item.snippet.title);
				// $('#search-results').append(youtubeMovie);
				// console.log(item);

			}
			
		});
	}
	/*

	// A simple way to recieve JSON data of a specific itteration of a property of an object
	$.getJSON('http://www.omdbapi.com/?s=Star%20Wars&r=json', function (data) {
		var myStuff = data.Search;
		$.each(myStuff, function(index, value) {
			console.log(value.Title);
		});
		console.log(myStuff);

	});
*/

