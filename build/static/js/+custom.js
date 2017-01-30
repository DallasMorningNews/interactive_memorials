$(document).ready(function() {

	//custom scripting goes here

		var submissionData;
		var filteredData = [];
		var uniqArray = [];
		var clickLocation;
		var centerCoord;
		var coord = [];
		var popupContentCir = "<p>Add a memorial suggestion here?</p><a class='yes-btn-cir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>";
		var popupContentNoCir = "<p>Add a memorial suggestion here?</p><a class='yes-btn-nocir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>";
		var geocoder = new mapboxgl.Geocoder({
			    container: 'geocoder-container' // Optional. Specify a unique container for the control to be added to.
			});
		var counter = 0;
		var parks = [];
		var race = "all";
		var customStyles;
		var circleColor = "#8554bf";
		var location = "all";
		var divHeight = 0;

		//dropmenu
			// Changes main dropmenu text to cliked li, hides map popup if filter li clicked
			function switchFilterHed() {
				$(".drop-location ul.dropmenu li a").click(function(){
					$(".location-hed").text($(this).text());
					$(".location-hed:first-child").val($(this).text());
					$('.mapboxgl-popup').hide();
				});
				$(".drop-filter ul.dropmenu li a").click(function(){
					$(".filter-hed").text($(this).text());
					$(".filter-hed:first-child").val($(this).text());
					$('.mapboxgl-popup').hide();
				});
				$('.filter-mob-expand li').click(function() {
					$('.mapboxgl-popup').hide();
				});
			}

			// Toggles one dropdown when the other opens or when clicked elsewhere on the screen
		   $('.filter').click(function(e) {
				e.stopPropagation();
				$(this).closest('.filter').siblings('.filter').find('ul.dropmenu:visible').slideToggle();
				$(this).find('ul.dropmenu').slideToggle();
		   });

		   // Anything clicked in the document will hide the dropdown
		   $(document).click(function(){
			 $('.drop-filter > ul.dropmenu').hide();
	  		 $('.drop-location > ul.dropmenu').hide();
		   });

		   // Shows/hides submission form and respective buttons
			   $(".add-pin, .map-wrapper h1").click(function() {
				   if ($('#form-wrapper').hasClass("visible")) {
					   $('#form-wrapper').removeClass("visible");
				   } else {
					   $('#form-wrapper').addClass("visible");
				   }
			   });

			   $('.close, .modal-close').click(function() {
				   $('#form-wrapper').removeClass('visible');
				   $('.modal').hide();
				   $('.form-control').val('');
				   $('.form-group').show();
				   $('.form-horizontal h5').hide();
			   });

			   $('.add-pin, .map-wrapper').click(function() {
				   $('.modal').hide();
				   $('.form-control').val('');
				   $('.form-group').show();
				   $('.form-horizontal h5').hide();
			   });

		   // Getting the value of the filter drop
			   $('.drop-filter li, .filter-mob-race li').click(function() {
				   race = $(this).attr("data-race");
				   filteringData(race, location);
			   });

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

				$.getJSON('http://apps.dallasnews.com/livewire/memorials/approved', function(data) {
					$.each(data, function(k,v) {
						v.race = v.race.trim();
						v.location = v.location.trim();
					});
					submissionData = data;
 					writeSubmissions(submissionData);

			        $.each(data, function(key, value) {
			            if (uniqArray.indexOf(value.location) === -1) {
			                uniqArray.push(value.location);
			            }
			        });
					console.log(uniqArray);

					writeLocations(uniqArray);
					switchFilterHed();

					map.on('load', function () {
						formatData(submissionData);
					});



					  jQuery(function(changeShadows) {
					 	 $('.submissions').on('scroll', function() {
					 		 if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 30) {
					 			 $('#shadow-bottom').removeClass("shadow2");
					 		 } else if ($(this).scrollTop() + $(this).innerHeight() <= $(this)[0].scrollHeight) {
					 			 $('#shadow-bottom').addClass("shadow2");
					 		 }
					 	 });
					  });

				});

				function writeSubmissions(data) {
					$.each(data, function(k,v) {
						   var content = submissionTemplate(v);
						   $(".submissions").append(content);
					});
				}

				function writeLocations(data) {
					$.each(data, function(k,v) {
							var content = "<li data-park='" + v + "'><a>" + v + "</a></li>";
							var mobileContent = "<li data-park='" + v + "'>" + v + "</li>";
						   $("li.drop-location > ul.dropmenu").append(content);
						   $(".filter-mob-expand ul:last-child").append(mobileContent);
						   // hide filter expansion on li click
					});
					$('.filter-mob-expand ul li').click(function () {
						$('.filter-mob-expand').slideToggle();
					});
					// Getting the value of the location drop
						$('.drop-location li, .filter-mob-location li').click(function() {
							location = $(this).attr("data-park");
							filteringData(race, location);
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

					  // then, iterate over the parks mapfeature data, and find the matching park
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


								$(".submission-nav h1").html(feature.properties.location);

							displaySubmissions(feature.properties.location);
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
								// $('#see-form, .map-wrapper h1').hide();
								$('.mapboxgl-popup').hide();
								$('.location-blank').val(feature.properties.location + coord);
							});

							$(".no-btn").click(function() {
								$('.mapboxgl-popup').hide();
								$('#form-wrapper').removeClass('visible');
								$('textarea#location-blank').val('');
							});

							$(".yes-btn-nocir").click(function() {
								$("#form-wrapper").addClass("visible");
								// $('#see-form, .map-wrapper h1').hide();
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

					// Formatting the filteredData
					function filteringData(race, location) {
						// counter = 0;

						if (race !== "all" && location !== "all") {
							filteredData = [];
							$.each(submissionData, function(k,v) {
								if (v.race === race && v.location === location) {
									filteredData.push(v);
									circleColor = v.color;
								}
							});

							clearMap();
							formatData(filteredData);

							$(".submissions").html("");

							if (filteredData.length !== 0) {
								writeSubmissions(filteredData);
								displaySubmissions(location);
							}

						}
						if (race === "all" && location === "all") {
							clearMap();
							circleColor = "#8554bf";
							formatData(submissionData);
							writeSubmissions(submissionData);
						}
						if (race === "all" && location !== "all") {
							filteredData = [];
							$.each(submissionData, function(k,v) {
								if (v.location === location) {
									filteredData.push(v);
									circleColor = "#8554bf";
								}
							});
							clearMap();
							formatData(filteredData);

							$(".submissions").html("");

							if (filteredData.length !== 0) {
								writeSubmissions(filteredData);
								displaySubmissions(location);
							}
						}
						if (location === "all" && race !== "all") {
							filteredData = [];
							$.each(submissionData, function(k,v) {
								if (v.race === race) {
									filteredData.push(v);
									circleColor = "#8554bf";
								}
							});
							clearMap();
							formatData(filteredData);

							$(".submissions").html("");

							if (filteredData.length !== 0) {
								writeSubmissions(filteredData);
								displaySubmissions(location);
							}
						}
					}

					// Clears the map of markers
					function clearMap() {
						map.removeSource("memorials");
						map.removeLayer("memorialSubmissions");
					}

					// Displays submissions
					function displaySubmissions(parkName) {
						$.each($(".card"), function() {
							if (parkName === "all" || $(this).attr("data-park") === parkName) {
								$(this).removeClass("no-show");
								$(this).addClass("exists");
							} else {
								$(this).addClass("no-show");
								$(this).removeClass("exists");
							}
						});
					}

					// submits memorial submission to database
					// Flags as approved and saves to database
				    $('.submit').click(function() {
						var subLong, subLat, subRace, raceKey;
						subRace = $('#race-dropdown option:selected').text();
						raceKey = $('#race-dropdown option:selected').index() - 1;

						var valid = false;

						$.each($('.form-control'), function(index, elem) {
							if (!$(elem).val()) {
								$(elem).addClass('form-control-empty');
								valid = false;
							} else {
								$(elem).removeClass('form-control-empty');
								valid = true;
							}
						});


						if (coord.length === 0) {
							subLong = "";
							subLat = "";
						} else {
							subLong = coord[0];
							subLat = coord[1];
						}
						colors = ['#e34e36', '#329ce8', '#ff8f24', '#52b033', '#fec44f'];
				        var submission = {
				            "approved": false,
				            "firstName": $('.first-blank').val(),
				            "lastName": $('.last-blank').val(),
				            "email": $('.email-blank').val(),
				            "race": subRace,
							"raceKey": raceKey,
							"color": colors[raceKey],
				            "location": $('.location-blank').val(),
							"lat": subLat,
							"long": subLong,
				            "why": $('.why-blank').val(),
				            "learnMore": $('.learn-blank').val()
				        };
						coord = [];

						if (valid === true) {
							enterSubmission(submission);
							// Display modal after submission
							$('.form-group').hide();
							$('.form-horizontal h5').show();
						}
					});

					function enterSubmission(submission) {
						// send the report object to the database.
						$.post("http://apps.dallasnews.com/livewire/memorials/submission", submission, function() {
				            console.log("Success!");
				            // $("#post-response").removeClass("no-show");
				        }).fail(function() {
				            console.log("Whoops, something bad happened!");
				        });
					}

					// show filter expansion on click
					$('.filter-mob').click(function () {
						$('.filter-mob-expand').slideToggle();
					});

	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
