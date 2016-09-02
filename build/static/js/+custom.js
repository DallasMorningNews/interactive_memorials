$(document).ready(function() {

	//custom scripting goes here


		// Shows/hides submission form
			$("#see-form, .map-wrapper h1").click(function() {
				$("#form-wrapper").addClass("visible");
				$('#see-form, .map-wrapper h1').hide();
			});

			$('.close').click(function() {
				$('#form-wrapper').removeClass('visible');
				$('#see-form, .map-wrapper h1').show();
			});


		var submissionData;

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

		// BUILDING THE MAP
			var map = new mapboxgl.Map({
				container: 'map', // the #id of your map
				center: [-96.9785, 32.8924], // just like Leaflet, where the map should centers on load
				zoom: 9, // just like Leaflet, the map's default zoom level
				style: 'http://maps.dallasnews.com/styles.json' // <= this tells Mapbox GL to use our vector tiles
			});


		// MAP CUSTOMIZATION
			// disables zoom
				map.scrollZoom.disable();
			// add search bar
				map.addControl(new mapboxgl.Geocoder());
				mapboxgl.accessToken = 'pk.eyJ1IjoibWFjbWFuIiwiYSI6ImVEbmNmZjAifQ.zVzy9cyjNT1tMYOTex51HQ';
			// adds zoom options
				map.addControl(new mapboxgl.Navigation());
			// adds cursor: pointer to map points
			map.on('mousemove', function (e) {
			    var features = map.queryRenderedFeatures(e.point, { layers: ['memorialSubmissions'] });
			    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
			});

		// ADDING DATA TO MAP
			// creating and compiling the template for our person objects
			    var submissionTemplate =  Handlebars.compile($("#submission").html());

				$.getJSON('js/data.json', function(data) {
					submissionData = data;
					writeSubmissions(submissionData);
					formatData(submissionData);
				});

				function writeSubmissions(data) {
					$.each(data, function(k,v) {
						   var content = submissionTemplate(v);
						   $(".submissions").append(content);
						   console.log(content);
					});
				}

				function formatData(data) {
					// placeholder array for parks mapping data
					var parks = [ ];

					// iterate over our original datra and create a new object to add to our parks mapping array
					$.each(data, function(k,v) {

					  var currentSub = {
					    "location": v.location,
					    "lat": v.lat,
					    "long": v.long,
					    "races": [ ]
					};

					  parks.push(currentSub);
					});


					// LODASH: go through our new parks mapping data, and filter out any that have a duplicate location
					parks = _.uniqBy(parks, "location");

					// iterate over the submissions data again and grab each one's park and race
					$.each(data, function(key, value) {
					  var currentPark = value.location;
					  var currentRace = value.race;

					  // then, iterate over the parks mapping data, and find the matching park
					  $.each(parks, function(k,v) {
					    if (currentPark === v.location) {

					      // then, check over the races array over that park, and if the currentRace isn't included, add it
					      if (_.indexOf(v.races, currentRace) === -1) {
					        v.races.push(currentRace);
					      }
					    }
					  });
					});

					console.log(parks);
					createMap(parks);
				}

				// Map points customization
					function createMap(data) {
						console.log("creating map");
						data = GeoJSON.parse(data, {Point: ['lat', 'long'], include: ['race', 'location']});

						map.on('load', function () {
							// adding the data source
				            map.addSource("memorials", {
				                type: "geojson",
				                data: data
				            });

				            // adding the data layer
				            map.addLayer({
				                "id": "memorialSubmissions",
				                "source": "memorials",
				                "type": "circle",
				                "paint": {
				                    "circle-radius": 5,
									// {
				                    //     stops: [[1, 10], [8, 10], [16, 9]]
				                    // },
				                    "circle-color": "#FBD44B",
				                    "circle-opacity": {
				                        "property": "opacity",
				                        "stops": [
				                            [0, 0], [1, 1]
				                        ]
				                    }
				                }
				            });
						});
					}

	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
