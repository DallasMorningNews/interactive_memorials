$(document).ready(function(){function e(e){$.each(e,function(e,o){var n=x(o);$(".submissions").append(n)})}function o(e){f=[],$.each(e,function(e,o){var n={location:o.location,lat:o.lat,"long":o["long"],races:[],raceKey:o.raceKey};f.push(n)}),f=_.uniqBy(f,"location"),$.each(e,function(e,o){var n=o.location,a=o.race;$.each(f,function(e,o){n===o.location&&_.indexOf(o.races,a)===-1&&o.races.push(a)})}),n(f),y.on("mousemove",function(e){var o=y.queryRenderedFeatures(e.point,{layers:["memorialSubmissions"]});y.getCanvas().style.cursor=o.length?"pointer":""})}function n(e){console.log(g),e=GeoJSON.parse(e,{Point:["lat","long"],include:["race","location","raceKey"]}),y.addSource("memorials",{type:"geojson",data:e}),y.addLayer({id:"memorialSubmissions",source:"memorials",type:"circle",paint:{"circle-radius":{stops:[[1,10],[8,10],[16,9]]},"circle-color":g,"circle-opacity":.8}})}function a(n){h=0,"all"!==n?(m=[],$.each(l,function(e,o){o.race===n&&(m.push(o),g=o.color)}),console.log(g),t(),o(m),$(".submissions").html(""),0===m.length?$(".submission-nav h1").html("No locations"):($(".submission-nav h1").html(m[h].location),e(m),s(m[h].location))):(t(),g="#fec44f",o(l),$(".submissions").html(""),$(".submission-nav h1").html("All locations"),e(l))}function t(){y.removeSource("memorials"),y.removeLayer("memorialSubmissions")}function s(e){$.each($(".submission-pv"),function(){$(this).attr("data-park")===e?$(this).removeClass("no-show"):$(this).addClass("no-show")})}function i(e){"sub-btn-prev"===e.attr("id")&&h>0?(h--,$("#sub-btn-prev").removeClass("unclickable")):"sub-btn-next"===e.attr("id")&&h<f.length-1&&(h++,$("#sub-btn-next").removeClass("unclickable")),"sub-btn-prev"===e.attr("id")&&h<=0?($("#sub-btn-prev").addClass("unclickable"),$("#sub-btn-next").removeClass("unclickable")):"sub-btn-next"==e.attr("id")&&h>=f.length-1?($("#sub-btn-next").addClass("unclickable"),$("#sub-btn-prev").removeClass("unclickable")):($("#sub-btn-prev").removeClass("unclickable"),$("#sub-btn-next").removeClass("unclickable")),console.log(l,h),"all"===v?($(".submission-nav h1").html(l[h].location),s(l[h].location)):($(".submission-nav h1").html(m[h].location),s(m[h].location))}var l,r,c,m=[],p=[],u="<p>Would you like to add a memorial suggestion here?</p><a class='yes-btn-cir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>",b="<p>Would you like to add a memorial suggestion here?</p><a class='yes-btn-nocir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>",d=new mapboxgl.Geocoder({container:"geocoder-container"}),h=0,f=[],v="all",g="#fec44f";$(".dropdown-menu li a").click(function(){$(".filter-btn:first-child").text($(this).text()),$(".filter-btn:first-child").val($(this).text()),$(".mapboxgl-popup").hide()}),mapboxgl.accessToken="pk.eyJ1IjoibWFjbWFuIiwiYSI6ImVEbmNmZjAifQ.zVzy9cyjNT1tMYOTex51HQ";var y=new mapboxgl.Map({container:"map",center:[-96.9785,32.8924],zoom:9,style:"mapbox://styles/mapbox/basic-v9"});y.scrollZoom.disable(),y.addControl(d),y.addControl(new mapboxgl.Navigation),y.on("mousemove",function(e){var o=y.queryRenderedFeatures(e.point,{layers:["memorialSubmissions"]});y.getCanvas().style.cursor=o.length?"pointer":""});var x=Handlebars.compile($("#submission").html());$.getJSON("js/data.json",function(n){l=n,e(l),y.on("load",function(){o(l)})}),y.on("click",function(e){r=e.lngLat,p=[r.lng,r.lat];var o,n=y.queryRenderedFeatures(e.point,{layers:["memorialSubmissions"]});if(n.length){var a=n[0];o=(new mapboxgl.Popup).setLngLat(a.geometry.coordinates).setHTML("<h5>"+a.properties.location+"</h5>"+u).addTo(y),$(".submission-nav h1").html(a.properties.location),s(a.properties.location)}else o=(new mapboxgl.Popup).setLngLat(p).setHTML("<h5>"+b+"</h5>").addTo(y),y.flyTo({center:p});n.length&&y.flyTo({center:n[0].geometry.coordinates}),$("#form-wrapper").removeClass("visible"),$(".yes-btn-cir").click(function(){$("#form-wrapper").addClass("visible"),$("#see-form, .map-wrapper h1").hide(),$(".mapboxgl-popup").hide(),$("textarea#location-blank").val(a.properties.location+p)}),$(".no-btn").click(function(){$(".mapboxgl-popup").hide(),$("#form-wrapper").removeClass("visible"),$("textarea#location-blank").val("")}),$(".yes-btn-nocir").click(function(){$("#form-wrapper").addClass("visible"),$("#see-form, .map-wrapper h1").hide(),$(".mapboxgl-popup").hide(),$("textarea#location-blank").val(p)})}),d.on("result",function(e){$(".mapboxgl-popup").hide(),c=e.result.geometry.coordinates;var o,n=[c[0],c[1]];o=(new mapboxgl.Popup).setLngLat(n).setHTML("<h5>"+b+"</h5>").addTo(y)}),$("#see-form, .map-wrapper h1").click(function(){$("#form-wrapper").addClass("visible"),$("#see-form, .map-wrapper h1").hide()}),$(".close").click(function(){$("#form-wrapper").removeClass("visible"),$("#see-form, .map-wrapper h1").show()}),$(".dropdown-menu li").click(function(){v=$(this).attr("data-race"),a(v)}),$(".sub-btn").click(function(){i($(this))});var k=new Date,w=k.getFullYear();$(".copyright").text(w)});
//# sourceMappingURL=scripts-bundle.js.map
