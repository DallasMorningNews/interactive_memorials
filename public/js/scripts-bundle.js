$(document).ready(function(){function o(o){$.each(o,function(o,e){var n=y(e);$(".submissions").append(n)})}function e(o){f=[],$.each(o,function(o,e){var n={location:e.location,lat:e.lat,"long":e["long"],races:[]};f.push(n)}),f=_.uniqBy(f,"location"),$.each(o,function(o,e){var n=e.location,a=e.race;$.each(f,function(o,e){n===e.location&&_.indexOf(e.races,a)===-1&&e.races.push(a)})}),n(f),v.on("mousemove",function(o){var e=v.queryRenderedFeatures(o.point,{layers:["memorialSubmissions"]});v.getCanvas().style.cursor=e.length?"pointer":""})}function n(o){o=GeoJSON.parse(o,{Point:["lat","long"],include:["race","location"]}),v.addSource("memorials",{type:"geojson",data:o}),v.addLayer({id:"memorialSubmissions",source:"memorials",type:"circle",paint:{"circle-radius":{stops:[[1,10],[8,10],[16,9]]},"circle-color":"#FBD44B","circle-opacity":{property:"opacity",stops:[[0,0],[1,1]]}}})}function a(n){h=0,"all"!==n?(m=[],$.each(l,function(o,e){e.race===n&&m.push(e)}),t(),e(m),$(".submissions").html(""),console.log(m),0===m.length?$(".submission-nav h1").html("No locations"):($(".submission-nav h1").html(m[h].location),o(m),i(m[h].location))):(t(),e(l),$(".submissions").html(""),$(".submission-nav h1").html("All locations"),o(l))}function t(){v.removeSource("memorials"),v.removeLayer("memorialSubmissions")}function i(o){$.each($(".submission-pv"),function(){$(this).attr("data-park")===o?$(this).removeClass("no-show"):$(this).addClass("no-show")})}function s(o){"sub-btn-prev"===o.attr("id")&&h>0?(h--,console.log("going back")):"sub-btn-next"===o.attr("id")&&h<f.length-1&&(h++,console.log("going forward")),console.log(l,h),"all"===g?($(".submission-nav h1").html(l[h].location),i(l[h].location)):($(".submission-nav h1").html(m[h].location),i(m[h].location))}var l,r,c,m=[],p=[],u="<p>Would you like to add a memorial suggestion here?</p><a class='yes-btn-cir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>",d="<p>Would you like to add a memorial suggestion here?</p><a class='yes-btn-nocir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>",b=new mapboxgl.Geocoder({container:"geocoder-container"}),h=0,f=[],g="all";$(".dropdown-menu li a").click(function(){$(".btn:first-child").text($(this).text()),$(".btn:first-child").val($(this).text())});var v=new mapboxgl.Map({container:"map",center:[-96.9785,32.8924],zoom:9,style:"http://maps.dallasnews.com/styles.json"});v.scrollZoom.disable(),v.addControl(b),mapboxgl.accessToken="pk.eyJ1IjoibWFjbWFuIiwiYSI6ImVEbmNmZjAifQ.zVzy9cyjNT1tMYOTex51HQ",v.addControl(new mapboxgl.Navigation),v.on("mousemove",function(o){var e=v.queryRenderedFeatures(o.point,{layers:["memorialSubmissions"]});v.getCanvas().style.cursor=e.length?"pointer":""});var y=Handlebars.compile($("#submission").html());$.getJSON("js/data.json",function(n){l=n,o(l),v.on("load",function(){e(l)})}),v.on("click",function(o){r=o.lngLat,p=[r.lng,r.lat];var e,n=v.queryRenderedFeatures(o.point,{layers:["memorialSubmissions"]});if(n.length){var a=n[0];e=(new mapboxgl.Popup).setLngLat(a.geometry.coordinates).setHTML("<h5>"+a.properties.location+"</h5>"+u).addTo(v)}else e=(new mapboxgl.Popup).setLngLat(p).setHTML("<h5>"+d+"</h5>").addTo(v),v.flyTo({center:p});n.length&&v.flyTo({center:n[0].geometry.coordinates}),$("#form-wrapper").removeClass("visible"),$(".yes-btn-cir").click(function(){$("#form-wrapper").addClass("visible"),$("#see-form, .map-wrapper h1").hide(),$(".mapboxgl-popup").hide(),$("textarea#location-blank").val(a.properties.location+p)}),$(".no-btn").click(function(){$(".mapboxgl-popup").hide(),$("#form-wrapper").removeClass("visible"),$("textarea#location-blank").val("")}),$(".yes-btn-nocir").click(function(){$("#form-wrapper").addClass("visible"),$("#see-form, .map-wrapper h1").hide(),$(".mapboxgl-popup").hide(),$("textarea#location-blank").val(p)})}),b.on("result",function(o){$(".mapboxgl-popup").hide(),c=o.result.geometry.coordinates;var e,n=[c[0],c[1]];e=(new mapboxgl.Popup).setLngLat(n).setHTML("<h5>"+d+"</h5>").addTo(v)}),$("#see-form, .map-wrapper h1").click(function(){$("#form-wrapper").addClass("visible"),$("#see-form, .map-wrapper h1").hide()}),$(".close").click(function(){$("#form-wrapper").removeClass("visible"),$("#see-form, .map-wrapper h1").show()}),$(".dropdown-menu li").click(function(){g=$(this).attr("data-race"),a(g)}),$(".sub-btn").click(function(){s($(this)),console.log(m[h].location)});var w=new Date,x=w.getFullYear();$(".copyright").text(x)});
//# sourceMappingURL=scripts-bundle.js.map
