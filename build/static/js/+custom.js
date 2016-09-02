$(document).ready(function() {

	//custom scripting goes here

	// mapbox gl code

	// mapboxgl.util.getJSON('http://maps.dallasnews.com/styles.json', function(req, styles) {
	//   styles.layers = styles.layers.map(function(layer) {
	//     if(layer.id === 'building') {
	//       layer.paint['fill-color'] = 'red';
	//     }
	//     else if(layer.id === 'waterway' || layer.id === 'waterway_stream') {
	//       layer.paint['line-color'] = '#2B93B5';
	//     }
	//     else if(layer.id === 'water') {
	//       layer.paint['fill-color'] = '#2B93B5';
	//     }
	// 	else if(layer.id === 'landuse_park') {
	//       layer.paint['fill-color'] = 'green';
	//     }
	//     return layer;
	//   });
	//
    // });

	var map = new mapboxgl.Map({
		container: 'map', // the #id of your map
		center: [-96.9785, 32.8924], // just like Leaflet, where the map should center on load
		zoom: 9, // just like Leaflet, the map's default zoom level
		style: 'http://maps.dallasnews.com/styles.json' // <= this tells Mapbox GL to use our vector tiles
	});

	map.scrollZoom.disable();
	map.addControl(new mapboxgl.Geocoder());
	map.addControl(new mapboxgl.Navigation());
	mapboxgl.accessToken = 'pk.eyJ1IjoibWFjbWFuIiwiYSI6ImVEbmNmZjAifQ.zVzy9cyjNT1tMYOTex51HQ';



	// Shows/hides submission form

	$("#see-form").click(function() {
		$("#form-wrapper").addClass("visible");
		$('#see-form').hide();
	});

	$('.close').click(function() {
		$('#form-wrapper').removeClass('visible');
		$('#see-form').show();
	});

	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
