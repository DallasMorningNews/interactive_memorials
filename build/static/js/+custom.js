$(document).ready(function() {

	//custom scripting goes here

		var submissionData;
		var filteredData = [];
		var clickLocation;
		var centerCoord;
		var coord = [];
		var popupContentCir = "<p>Would you like to add a memorial suggestion here?</p><a class='yes-btn-cir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>";
		var popupContentNoCir = "<p>Would you like to add a memorial suggestion here?</p><a class='yes-btn-nocir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>";
		var geocoder = new mapboxgl.Geocoder({
			    container: 'geocoder-container' // Optional. Specify a unique container for the control to be added to.
			});
		var counter = 0;
		var parks = [];
		var race = "all";
		var customStyles;
		var circleColor = "#fec44f";

		//bootstrap dropdown

	    $(".dropdown-menu li a").click(function(){

	      $(".btn:first-child").text($(this).text());
	      $(".btn:first-child").val($(this).text());

	   });




	//    // mapbox gl code
	//    	mapboxgl.util.getJSON('http://maps.dallasnews.com/styles.json', function(req, styles) {
	//    	  customStyles = styles;
	//    	  customStyles.layers = styles.layers.map(function(layer) {
	//    		if(layer.id === 'building') {
	//    		  layer.paint['fill-color'] = 'red';
	//    		}
	//    		else if(layer.id === 'waterway' || layer.id === 'waterway_stream') {
	//    		  layer.paint['line-color'] = '#2B93B5';
	//    		}
	//    		else if(layer.id === 'water') {
	//    		  layer.paint['fill-color'] = '#2B93B5';
	//    		}
	//    		else if(layer.id === 'landuse_park') {
	//    		  layer.paint['fill-color'] = 'green';
	//    		}
	//    		return layer;
	//    	  });
	   //
	//    	  // BUILDING THE MAP
	//    		map = new mapboxgl.Map({
	//    			container: 'map', // the #id of your map
	//    			center: [-96.9785, 32.8924], // just like Leaflet, where the map should centers on load
	//    			zoom: 9, // just like Leaflet, the map's default zoom level
	//    			style: 'mapbox://styles/mapbox/streets-v9'
	//    			// 'http://maps.dallasnews.com/styles.json' // <= this tells Mapbox GL to use our vector tiles
	//    		});
	//    	});


		mapboxgl.accessToken = 'pk.eyJ1IjoibWFjbWFuIiwiYSI6ImVEbmNmZjAifQ.zVzy9cyjNT1tMYOTex51HQ';

		// BUILDING THE MAP
			var map = new mapboxgl.Map({
				container: 'map', // the #id of your map
				center: [-96.9785, 32.8924], // just like Leaflet, where the map should centers on load
				zoom: 9, // just like Leaflet, the map's default zoom level
				style:
				 'mapbox://styles/mapbox/basic-v9' // <= this tells Mapbox GL to use our vector tiles
			});


		// MAP CUSTOMIZATION
			// disables zoom
				map.scrollZoom.disable();
			// add search bar
				map.addControl(geocoder);
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
					map.on('load', function () {
						formatData(submissionData);
					});
				});

				function writeSubmissions(data) {
					$.each(data, function(k,v) {
						   var content = submissionTemplate(v);
						   $(".submissions").append(content);
					});
				}




				function formatData(data) {
					// placeholder array for parks mapfeatureg data
					parks = [];


					// iterate over our original datra and create a new object to add to our parks mapfeatureg array
					$.each(data, function(k,v) {

					  var currentSub = {
					    "location": v.location,
					    "lat": v.lat,
					    "long": v.long,
					    "races": [ ],
						"raceKey": v.raceKey
					};

					  parks.push(currentSub);
					});


					// LODASH: go through our new parks mapfeatureg data, and filter out any that have a duplicate location
					parks = _.uniqBy(parks, "location");

					// iterate over the submissions data again and grab each one's park and race
					$.each(data, function(key, value) {
					  var currentPark = value.location;
					  var currentRace = value.race;

					  // then, iterate over the parks mapfeatureg data, and find the matching park
					  $.each(parks, function(k,v) {
					    if (currentPark === v.location) {

					      // then, check over the races array over that park, and if the currentRace isn't included, add it
					      if (_.indexOf(v.races, currentRace) === -1) {
					        v.races.push(currentRace);
					      }
					    }
					  });
					});

					createMap(parks);

					// adds cursor: pointer to map points
						map.on('mousemove', function (e) {
							var features = map.queryRenderedFeatures(e.point, { layers: ['memorialSubmissions'] });
							map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
						});
				}



				// Map points customization
					function createMap(data) {
						console.log(circleColor);
						data = GeoJSON.parse(data, {Point: ['lat', 'long'], include: ['race', 'location', 'raceKey']});

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
				                    "circle-radius":
									{
				                        stops: [[1, 10], [8, 10], [16, 9]]
				                    },
									'circle-color': circleColor,
									// {
									//     property: 'raceKey',
									//     stops: [
									//         [0, '#fec44f'],
									//         [1, '#e34e36'],
									// 		[2, '#329ce8'],
									// 		[3, '#52b033'],
									// 		[4, '#8554bf'],
									// 		[5, '#ff8f24']
									//     ]
									// },
									"circle-opacity": 0.8
				                }
				            });

					}

					map.on('click', function (e) {
                        clickLocation = e.lngLat;
                        coord = [clickLocation.lng, clickLocation.lat];

                        // setting features equal to all the circles on the map
                        var features = map.queryRenderedFeatures(e.point, { layers: ['memorialSubmissions'] });

                        var popup;
                        // checking to see if the click was on one of the circles.
                        // if it's not, do all the code inside this if statement

                        if (!features.length) {
                            popup = new mapboxgl.Popup()
                                .setLngLat(coord)
								.setHTML("<h5>" + popupContentNoCir + "</h5>")
                                .addTo(map);
								map.flyTo({center: coord});
                        }

                        // else, if the click is on the circle, do all the code
                        // inside this else statement
                        else {
                            var feature = features[0];

                            // Populate the popup and set its coordinates
                            // based on the feature found.
                            popup = new mapboxgl.Popup()
                                .setLngLat(feature.geometry.coordinates)
								.setHTML("<h5>" + feature.properties.location + "</h5>" + popupContentCir)
                                .addTo(map);
                        }

						if (features.length) {
							// Get coordinates from the symbol and center the map on those coordinates
							map.flyTo({center: features[0].geometry.coordinates});
						}

						// Shows/hides submission form and respective buttons
						// Adds value to textarea

							$('#form-wrapper').removeClass('visible');

							$(".yes-btn-cir").click(function() {
								$("#form-wrapper").addClass("visible");
								$('#see-form, .map-wrapper h1').hide();
								$('.mapboxgl-popup').hide();
								$('textarea#location-blank').val(feature.properties.location + coord);
							});

							$(".no-btn").click(function() {
								$('.mapboxgl-popup').hide();
								$('#form-wrapper').removeClass('visible');
								$('textarea#location-blank').val('');
							});

							$(".yes-btn-nocir").click(function() {
								$("#form-wrapper").addClass("visible");
								$('#see-form, .map-wrapper h1').hide();
								$('.mapboxgl-popup').hide();
								$('textarea#location-blank').val(coord);
							});


                    });

					// Listen for the `geocoder.input` event that is triggered when a user
				    // makes a selection and add a symbol that matches the result.
				    geocoder.on('result', function(ev) {

						$('.mapboxgl-popup').hide();

						centerCoord = ev.result.geometry.coordinates;
                        var coord = [centerCoord[0], centerCoord[1]];

                        var popup;

                        popup = new mapboxgl.Popup()
							.setLngLat(coord)
							.setHTML("<h5>" + popupContentNoCir + "</h5>")
                            .addTo(map);
							// map.flyTo({center: coord});
                        // }

				    });

					// Shows/hides submission form and respective buttons
						$("#see-form, .map-wrapper h1").click(function() {
							$("#form-wrapper").addClass("visible");
							$('#see-form, .map-wrapper h1').hide();
						});

						$('.close').click(function() {
							$('#form-wrapper').removeClass('visible');
							$('#see-form, .map-wrapper h1').show();
						});

					// Getting the value of the dropdown
						$('.dropdown-menu li').click(function() {
							race = $(this).attr("data-race");
							filteringData(race);
						});

					// Formatting the filteredData
					function filteringData(race) {
						counter = 0;

						if (race !== "all") {
							filteredData = [];
							$.each(submissionData, function(k,v) {
								if (v.race === race) {
									filteredData.push(v);
									circleColor = v.color;
								}
							});
							console.log(circleColor);

							clearMap();
							formatData(filteredData);

							$(".submissions").html("");

							if (filteredData.length === 0) {
								$(".submission-nav h1").html("No locations");
							} else {
								$(".submission-nav h1").html(filteredData[counter].location);
								writeSubmissions(filteredData);
								displaySubmissions(filteredData[counter].location);
							}

						} else {
							clearMap();
							circleColor = "#fec44f";
							formatData(submissionData);
							$(".submissions").html("");
							$(".submission-nav h1").html("All locations");
							writeSubmissions(submissionData);
						}
					}

					// Clears the map of markers
					function clearMap() {
						// map.off("click");
						// map.off("mousemove");
						map.removeSource("memorials");
						map.removeLayer("memorialSubmissions");
					}

					// Displays submissions
					function displaySubmissions(parkName) {
						$.each($(".submission-pv"), function() {
							if ($(this).attr("data-park") === parkName) {
								$(this).removeClass("no-show");
							} else {
								$(this).addClass("no-show");
							}
						});
					}

					// Previous and next for park sumbissions
					function changeParks(thisObj) {
					    if (thisObj.attr("id") === "sub-btn-prev" && counter > 0) {
					        counter --;
							console.log("going back");
					    } else if (thisObj.attr("id") === "sub-btn-next" && counter < (parks.length - 1)) {
					        counter ++;
							console.log("going forward");
					    }
						console.log(submissionData, counter);
						if (race === "all") {
							$(".submission-nav h1").html(submissionData[counter].location);
							displaySubmissions(submissionData[counter].location);
						} else {
							$(".submission-nav h1").html(filteredData[counter].location);
							displaySubmissions(filteredData[counter].location);
						}

					}

					$(".sub-btn").click(function() {
					    changeParks($(this));
					});





	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
