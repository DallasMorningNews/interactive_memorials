$(document).ready(function() {

	//custom scripting goes here


	// mapbox gl code
	var map = new mapboxgl.Map({
	  container: 'map', // the #id of your map
	  center: [-96.9785, 32.8924], // just like Leaflet, where the map should center on load
	  zoom: 9, // just like Leaflet, the map's default zoom level
	  style: 'http://maps.dallasnews.com/styles.json' // <= this tells Mapbox GL to use our vector tiles
	});

	map.scrollZoom.disable();
	map.addControl(new mapboxgl.Geocoder());
	map.addControl(new mapboxgl.Navigation());


	// submissions nav code

	$('#add-minus').click(function() {
		$('#form-wrapper').removeClass('hide');
	});

	$("#see-responses").click(function(e) {
	        e.preventDefault();
	        if ($(this).hasClass("expanded") === true) {
	            $(this).children("span").text("+");
	            $("#form-wrapper").removeClass('hide').slideDown(1000);
	        } else {
	            $(this).children("span").text("-");
	            $("#form-wrapper").slideUp();
	        }
	        $(this).toggleClass("expanded");
	});

	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
