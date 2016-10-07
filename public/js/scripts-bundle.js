$(document).ready(function(){function e(e){$.each(e,function(e,s){var o=k(s);$(".submissions").append(o)})}function s(e){v=[],$.each(e,function(e,s){var o={location:s.location,lat:s.lat,"long":s["long"],races:[],raceKey:s.raceKey};v.push(o)}),v=_.uniqBy(v,"location"),$.each(e,function(e,s){var o=s.location,n=s.race;$.each(v,function(e,s){o===s.location&&_.indexOf(s.races,n)===-1&&s.races.push(n)})}),o(v),C.on("mousemove",function(e){var s=C.queryRenderedFeatures(e.point,{layers:["memorialSubmissions"]});C.getCanvas().style.cursor=s.length?"pointer":""})}function o(e){e=GeoJSON.parse(e,{Point:["lat","long"],include:["race","location","raceKey"]}),C.addSource("memorials",{type:"geojson",data:e}),C.addLayer({id:"memorialSubmissions",source:"memorials",type:"circle",paint:{"circle-radius":{stops:[[1,10],[8,10],[16,9]]},"circle-color":g,"circle-opacity":.8}})}function n(o){h=0,"all"!==o?(b=[],$.each(l,function(e,s){s.race===o&&(b.push(s),g=s.color)}),a(),s(b),$(".submissions").html(""),0===b.length?($(".submission-nav h1").html("No locations"),$("#sub-btn-prev").addClass("unclickable"),$("#sub-btn-next").addClass("unclickable")):($(".submission-nav h1").html(b[h].location),e(b),t(b[h].location),$("#sub-btn-prev").removeClass("unclickable"),$("#sub-btn-next").removeClass("unclickable"),i($(".sub-btn")))):(a(),g="#e34e36",s(l),$("#sub-btn-prev").removeClass("unclickable"),$("#sub-btn-next").removeClass("unclickable"),i($(".sub-btn")),$(".submissions").html(""),$(".submission-nav h1").html("All locations"),e(l))}function a(){C.removeSource("memorials"),C.removeLayer("memorialSubmissions")}function t(e){$.each($(".card"),function(){$(this).attr("data-park")===e?($(this).removeClass("no-show"),$(this).addClass("exists")):($(this).addClass("no-show"),$(this).removeClass("exists"))})}function i(e){"sub-btn-prev"===e.attr("id")&&h>0?(h--,$("#sub-btn-prev").removeClass("unclickable"),"#sub-btn-next".hasClass("unclickable")&&h>=v.length-1&&$("sub-btn-next").addClass("unclickable")):"sub-btn-next"===e.attr("id")&&h<v.length-1&&(h++,$("#sub-btn-next").removeClass("unclickable")),"sub-btn-prev"===e.attr("id")&&h<=0?($("#sub-btn-prev").addClass("unclickable"),"#sub-btn-next".hasClass("unclickable")&&h>=v.length-1?$("sub-btn-next").addClass("unclickable"):$("#sub-btn-next").removeClass("unclickable")):"sub-btn-next"==e.attr("id")&&h>=v.length-1?($("#sub-btn-next").addClass("unclickable"),$("#sub-btn-prev").removeClass("unclickable")):($("#sub-btn-prev").removeClass("unclickable"),$("#sub-btn-next").removeClass("unclickable")),"all"===f?($(".submission-nav h1").html(l[h].location),t(l[h].location)):($(".submission-nav h1").html(b[h].location),t(b[h].location))}var l,r,c,b=[],u=[],m="<p>Add a memorial suggestion here?</p><a class='yes-btn-cir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>",p="<p>Add a memorial suggestion here?</p><a class='yes-btn-nocir btn btn-primary btn-sm'>Yes</a><a class='no-btn btn btn-default btn-sm'>No</a>",d=new mapboxgl.Geocoder({container:"geocoder-container"}),h=0,v=[],f="all",g="#e34e36",x=0;$(".dropmenu li a").click(function(){$(".filter-btn:first-child").text($(this).text()),$(".filter-btn:first-child").val($(this).text()),$(".mapboxgl-popup").hide()}),$("#filter-desk").click(function(){$("ul.dropmenu").slideToggle()}),$("#filter-mob").click(function(){$("ul.dropmenu").slideToggle()}),mapboxgl.accessToken="pk.eyJ1IjoibWFjbWFuIiwiYSI6ImVEbmNmZjAifQ.zVzy9cyjNT1tMYOTex51HQ";var C=new mapboxgl.Map({container:"map",center:[-96.9785,32.8924],zoom:9,style:"mapbox://styles/mapbox/basic-v9"});C.scrollZoom.disable(),C.addControl(d),C.addControl(new mapboxgl.Navigation),C.on("mousemove",function(e){var s=C.queryRenderedFeatures(e.point,{layers:["memorialSubmissions"]});C.getCanvas().style.cursor=s.length?"pointer":""});var k=Handlebars.compile($("#submission").html());$.getJSON("js/data.json",function(o){l=o,e(l),C.on("load",function(){s(l)}),jQuery(function(e){$(".submissions").on("scroll",function(){$(this).scrollTop()+$(this).innerHeight()>=$(this)[0].scrollHeight-30?$("#shadow-bottom").removeClass("shadow2"):$(this).scrollTop()+$(this).innerHeight()<=$(this)[0].scrollHeight&&$("#shadow-bottom").addClass("shadow2")})}),$(".sub-btn").click(function(){x=0,$(".exists").each(function(){x+=$(this).outerHeight(!0),console.log(x)}),console.log("final height:"+x),x<=$(".submissions").height()?$("#shadow-bottom").removeClass("shadow2"):$("#shadow-bottom").addClass("shadow2")})}),C.on("click",function(e){r=e.lngLat,u=[r.lng,r.lat];var s,o=C.queryRenderedFeatures(e.point,{layers:["memorialSubmissions"]});if(o.length){var n=o[0];s=(new mapboxgl.Popup).setLngLat(n.geometry.coordinates).setHTML("<h5>"+n.properties.location+"</h5>"+m).addTo(C),$(".submission-nav h1").html(n.properties.location),t(n.properties.location)}else s=(new mapboxgl.Popup).setLngLat(u).setHTML("<h5>"+p+"</h5>").addTo(C),C.flyTo({center:u});o.length&&C.flyTo({center:o[0].geometry.coordinates}),$("#form-wrapper").removeClass("visible"),$(".yes-btn-cir").click(function(){$("#form-wrapper").addClass("visible"),$(".mapboxgl-popup").hide(),$("textarea#location-blank").val(n.properties.location+u)}),$(".no-btn").click(function(){$(".mapboxgl-popup").hide(),$("#form-wrapper").removeClass("visible"),$("textarea#location-blank").val("")}),$(".yes-btn-nocir").click(function(){$("#form-wrapper").addClass("visible"),$(".mapboxgl-popup").hide(),$("textarea#location-blank").val(u)})}),d.on("result",function(e){$(".mapboxgl-popup").hide(),c=e.result.geometry.coordinates;var s,o=[c[0],c[1]];s=(new mapboxgl.Popup).setLngLat(o).setHTML("<h5>"+p+"</h5>").addTo(C)}),$("#see-form, .map-wrapper h1").click(function(){$("#form-wrapper").hasClass("visible")?$("#form-wrapper").removeClass("visible"):$("#form-wrapper").addClass("visible")}),$(".close").click(function(){$("#form-wrapper").removeClass("visible")}),$(".dropmenu li").click(function(){f=$(this).attr("data-race"),n(f)}),$(".sub-btn").click(function(){i($(this))});var y=new Date,w=y.getFullYear();$(".copyright").text(w)});
//# sourceMappingURL=scripts-bundle.js.map
